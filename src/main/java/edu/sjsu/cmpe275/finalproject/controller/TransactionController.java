package edu.sjsu.cmpe275.finalproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.cmpe275.finalproject.model.Offers;
import edu.sjsu.cmpe275.finalproject.model.Transaction;
import edu.sjsu.cmpe275.finalproject.services.TransactionService;
import edu.sjsu.cmpe275.finalproject.services.PostExchangeOfferService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/exchange")
public class TransactionController {

	@Autowired
	TransactionService directexchangeservice;

	@Autowired
	PostExchangeOfferService posthangeservice;
	
	@Autowired
	AutoMatchingController auto;

	@PostMapping("/directaccept")
	public ResponseEntity starttransactionforaccept(@RequestBody Transaction trans) {
		try {
			directexchangeservice.directAcceptOffer(trans);
			return new ResponseEntity<>(null, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/transactionstatus/{username}/{offer_status}")
	public ResponseEntity<List<Transaction>> getAllInTransaactionOffers(@PathVariable(required = true, name = "username") String userName,@PathVariable(required = true, name = "offer_status") String offer_status) {
		List<Transaction> alltranscations=null;
		try {
			alltranscations= directexchangeservice.getInTransactionOffers(userName,offer_status);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Transaction>>(alltranscations, HttpStatus.OK);
	}

	@PostMapping("/counteroffer")
	public ResponseEntity starttransactionforcounteroffer(@RequestBody Transaction trans) {
		try {
			directexchangeservice.counterOffer(trans);
			return new ResponseEntity<>(null, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
//	@PostMapping("/counteroffer")
//	public ResponseEntity starttransactionforcounteroffer(@RequestBody Offers trans) {
//		try {
//			ResponseEntity<List<Offers>> singlematching = auto.getSingleAutoMatchedOffers(trans.getId());
//			System.out.println(trans);
//			for(int i=0;i<singlematching.)
//		//	directexchangeservice.counterOffer(trans);
//			return new ResponseEntity<>(null, HttpStatus.OK);
//		} catch (Exception e) {
//			System.err.println(e);
//			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//		}
//	}
	
	@PostMapping("/acceptcounteroffer")
	public ResponseEntity acceptcounteroffer(@RequestBody Transaction trans) {
		try {
			directexchangeservice.counterOffer(trans);
			return new ResponseEntity<>(null, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	
	@GetMapping("/transactionhistory/{username}")
	public ResponseEntity<List<Transaction>> getTransactionHistory(@PathVariable(required = true, name = "username") String userName) {
		List<Transaction> alltranscations=null;
		try {
			alltranscations= directexchangeservice.getTransactionHistory(userName);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Transaction>>(alltranscations, HttpStatus.OK);
	}

	@PostMapping("/exchangeaction/{username}/{decision}") // generic api for accpeting counter offers or direct offers													// or send money button
	public ResponseEntity starttransaction(@PathVariable(required = true, name = "username") String userName,
			@PathVariable(required = true, name = "decision") String decision) {
		try {
			directexchangeservice.setUsername(userName);
			directexchangeservice.setDecision(decision);
			return new ResponseEntity<>(null, HttpStatus.OK);
			
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

}
