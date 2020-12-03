package edu.sjsu.cmpe275.finalproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
	
	
	@PostMapping("/startexchange")
	public ResponseEntity starttransaction(@RequestBody Transaction trans) {

		try {
			directexchangeservice.startDirectExchange(trans);
			return new ResponseEntity<>(null, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	

}
