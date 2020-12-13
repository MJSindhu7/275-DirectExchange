package edu.sjsu.cmpe275.finalproject.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import edu.sjsu.cmpe275.finalproject.model.Offers;
import edu.sjsu.cmpe275.finalproject.model.Transaction;
import edu.sjsu.cmpe275.finalproject.repository.PostExchangeOfferRepository;
import edu.sjsu.cmpe275.finalproject.repository.TransactionRepository;

@Service
public class TransactionService {

	String username = "";
	String decision = "";

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDecision() {
		return decision;
	}

	public void setDecision(String decision) {
		this.decision = decision;
	}

	@Autowired
	UserService userservice;

	@Autowired
	BankAccountService bankAccountService;

	@Autowired
	PostExchangeOfferService offerservice;

	@Autowired
	TransactionRepository transrepo;;

	public void directAcceptOffer(Transaction trans) throws Exception {

		String offerstatus = "";

		// 1.notify user -received request plz send money in 10min to DE bankaccount

		if (trans.getOfferAccepter() != null && trans.getUserName() != null) {

			// 2.update offer status
			offerstatus = "InTransaction";
			transrepo.save(trans);
			offerservice.updateStatus(trans, offerstatus);
			enterInTransactionMode(trans,"Expired");
		}

	}

	public void counterOffer(Transaction trans) throws Exception {
		System.out.println("samee");
		boolean counterofferaccepted = false;
		boolean stoploop = false;
		String offerstatus = "";
		// 1.notify user

		if (trans.getNewRemitAmount() != 0.00) {

			offerstatus = "countermade";
			//transrepo.save(trans);
			offerservice.updateStatus(trans, "countermade");
			stoploop = true;
		}
		long startTime = System.currentTimeMillis();
		long maxDurationInMilliseconds = 5 * 60 * 1000;

		while (System.currentTimeMillis() < startTime + maxDurationInMilliseconds && stoploop) {

			System.out.println(getDecision() + "--" + getUsername() + "--" + trans.getUserName());

			if (getUsername().equalsIgnoreCase(trans.getUserName()) && getDecision().equalsIgnoreCase("accepted")) {
				counterofferaccepted = true;
				stoploop = false;
			}

		}

		if (counterofferaccepted == false) { // if counteroffer not accpted by the offer proposer in 5min

			offerstatus = "Open";
			trans.setOfferStatus(offerstatus);
			transrepo.save(trans);
			offerservice.updateStatus(trans, offerstatus);

		} else {

			offerstatus = "InTransaction";
			offerservice.updateStatus(trans, offerstatus);
			enterInTransactionMode(trans,"Open");
		}
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void enterInTransactionMode(Transaction trans,String ifnotransaction) {

		boolean fetchbankbalance = true;

		boolean offerproposer = false;
		boolean offeraccepter = false;
		boolean transactiondone = false;
		String offerstatus = "";

		long startTime = System.currentTimeMillis();
		long maxDurationInMilliseconds = 10 * 60 * 1000;
		
		transrepo.save(trans);

		while (System.currentTimeMillis() < startTime + maxDurationInMilliseconds && fetchbankbalance) {

			if (getUsername().equalsIgnoreCase(trans.getOfferAccepter())
					&& getDecision().equalsIgnoreCase("transfered")) {
				offeraccepter = true;
			}

			if (getUsername().equalsIgnoreCase(trans.getUserName()) && getDecision().equalsIgnoreCase("transfered")) {
				offerproposer = true;
			}

			if (offerproposer && offeraccepter || offerstatus.equalsIgnoreCase("Fulfilled")) {
				offerstatus = "Fulfilled";
				offerproposer = false;
				offeraccepter = false;
				// 4.send email that money has received to account

				// 5.charge service fee and dedcut amount

				// 6.send email that money has transfered to account

				trans.setOfferStatus(offerstatus);
				offerservice.updateStatus(trans, offerstatus);
				transrepo.save(trans);
				fetchbankbalance = false;
				transactiondone = true;
			}

		}

		if (transactiondone == false) {
			offerstatus =ifnotransaction;
			trans.setOfferStatus(offerstatus);
			offerservice.updateStatus(trans, offerstatus);
			transrepo.save(trans);

		}
	}
	
//	private double serviceFee(Transaction trans) {
//		
//		double servicefee = (trans.getServiceFee()/100)*(trans.getRemitAmount());
//		return trans.getRemitAmount()-servicefee;
//	}

	public Transaction saveTransaction(Transaction trans) {
		return transrepo.save(trans);
	}
	
	public List<Transaction> getInTransactionOffers(String username,String offer_status) {
		return transrepo.getInTransactionOffers(username,offer_status);
	}

}