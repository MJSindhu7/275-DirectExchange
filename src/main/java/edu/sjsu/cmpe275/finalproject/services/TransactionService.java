package edu.sjsu.cmpe275.finalproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.util.StopWatch;

import edu.sjsu.cmpe275.finalproject.model.BankAccount;
import edu.sjsu.cmpe275.finalproject.model.Offers;
import edu.sjsu.cmpe275.finalproject.model.Transaction;
import edu.sjsu.cmpe275.finalproject.model.User;
import edu.sjsu.cmpe275.finalproject.repository.TransactionRepository;

@Service
@Transactional
public class TransactionService {

	@Autowired
	UserService userservice;

//	@Autowired
//	BankAccountService bankAccountService;

	@Autowired
	PostExchangeOfferService offerservice;

	@Autowired
	TransactionRepository transrepo;;

	@Transactional(rollbackFor = Exception.class)
	public void startDirectExchange(Transaction trans) throws Exception {
		System.out.println("samee");

		// 1.notify user
		// 2.update offer status
		offerservice.updateStatus(trans, "InTransaction");
		
		//3.start timmer
		long start = System.currentTimeMillis();
		long end = start + 10 * 1000;
		boolean watch = true;
		boolean sendertransaction = false, receivertarnsaction = false;

		while (watch) {
			if (System.currentTimeMillis() > end && sendertransaction == false || receivertarnsaction == false) {
				watch = false;
				//throw new RuntimeException(); 
			} else {
				
				//4.check both bank account balance in DE account
				
				//5.distrubute money
				
				//6.save transaction
				System.out.println("savingg");
				saveTransaction(trans);
				
				
				
			}
		}
	}
	
	public Transaction saveTransaction(Transaction trans) {
		return transrepo.save(trans);
	}

}