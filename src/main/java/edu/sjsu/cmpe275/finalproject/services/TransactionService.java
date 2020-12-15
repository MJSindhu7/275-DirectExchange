package edu.sjsu.cmpe275.finalproject.services;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;

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
	SendEmail email;

	TransactionService() {
		email = new SendEmail();
	}

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

		email.sendMailfunc(trans.getUserName(), trans.getOfferAccepter() + " has accepted your offer");

		// 1.notify user -received request plz send money in 10min to DE bankaccount

		if (trans.getOfferAccepter() != null && trans.getUserName() != null) {

			// 2.update offer status
			offerstatus = "InTransaction";
			//trans.setOfferStatus(offerstatus);
			//transrepo.save(trans);
			offerservice.updateStatus(trans, offerstatus);
			enterInTransactionMode(trans, "Expired");
		}

	}

	public void counterOffer(Transaction trans) throws Exception {
		boolean counterofferaccepted = false;
		boolean stoploop = false;
		String offerstatus = "";
		// 1.notify user
		if (trans.getNewRemitAmount() != 0.00) {

			email.sendMailfunc(trans.getUserName(),
					trans.getOfferAccepter() + " Made a counter offer of " + trans.getNewRemitAmount());
			email.sendMailfunc(trans.getOfferAccepter(),
					"You made a counter offer to " + trans.getUserName() + " of " + trans.getNewRemitAmount());

			offerstatus = "countermade";
			// transrepo.save(trans);
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
			enterInTransactionMode(trans, "Open");
		}
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class)
	public void enterInTransactionMode(Transaction trans, String ifnotransaction) {

		boolean fetchbankbalance = true;

		boolean offerproposer = false;
		boolean offeraccepter = false;
		boolean transactiondone = false;
		String offerstatus = "InTransaction";

		long startTime = System.currentTimeMillis();
		long maxDurationInMilliseconds = 10 * 60 * 1000;
		
		trans.setOfferStatus(offerstatus);
		
		
		java.util.Date dt = new java.util.Date();

		java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		email.sendMailfunc(trans.getUserName(), "Please Send Money To Direct Exchange account in 10min");
		email.sendMailfunc(trans.getOfferAccepter(), "Please Send Money To Direct Exchange account in 10min");

		trans.setTimestamp(dt);
		transrepo.save(trans);
		while (System.currentTimeMillis() < startTime + maxDurationInMilliseconds && fetchbankbalance) {

			if (getUsername().equalsIgnoreCase(trans.getOfferAccepter())
					&& getDecision().equalsIgnoreCase("transfered")) {
				offeraccepter = true;
				setUsername("");
				setDecision("");
				email.sendMailfunc(trans.getUserName(),
						"Direct Exchange has recived the money " + trans.getRemitAmountSource());
			
			}

			if (getUsername().equalsIgnoreCase(trans.getUserName()) && getDecision().equalsIgnoreCase("transfered")) {
				offerproposer = true;
				setUsername("");
				setDecision("");
				email.sendMailfunc(trans.getOfferAccepter(),
						"Direct Exchange has recived the money " + trans.getRemitAmountDestination());

			}

			if (offerproposer && offeraccepter) {
				offerstatus = "Fulfilled";
				offerproposer = false;
				offeraccepter = false;
			
			
				

				trans.setOfferStatus(offerstatus);
				transrepo.save(trans);
				offerservice.updateStatus(trans, offerstatus);
				fetchbankbalance = false;
				transactiondone = true;
				offerstatus="";
				// 5.charge service fee and dedcut amount

				// 6.send email that money has transfered to account
				email.sendMailfunc(trans.getUserName(),
						"Money has been transfered to your account and after service fee (0.05%) the amount is " + serviceFeeDestination(trans));
				email.sendMailfunc(trans.getOfferAccepter(),
						"Money has been transfered to your account and after service fee (0.05%) the amount is " + serviceFeeSource(trans));
				
			
			}

		}

		if (transactiondone == false) {
			offerstatus = ifnotransaction;
			trans.setOfferStatus(offerstatus);
			offerservice.updateStatus(trans, offerstatus);
			transrepo.save(trans);

		}
	}
	

	private double serviceFeeSource(Transaction trans) {

		double servicefee = (trans.getServiceFee() / 100) * (trans.getRemitAmountSource());
		return trans.getRemitAmountSource() - servicefee;
	}
	
	private double serviceFeeDestination(Transaction trans) {

		double servicefee = (trans.getServiceFee() / 100) * (trans.getRemitAmountDestination());
		return trans.getRemitAmountDestination() - servicefee;
	}

	public Transaction saveTransaction(Transaction trans) {
		return transrepo.save(trans);
	}

	public List<Transaction> getInTransactionOffers(String username, String offer_status) {
		return transrepo.getInTransactionOffers(username, offer_status);
	}

	public List<Transaction> getTransactionHistory(String username) {
		return transrepo.getInTransactionHistory(username);
	}

}