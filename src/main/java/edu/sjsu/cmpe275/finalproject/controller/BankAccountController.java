package edu.sjsu.cmpe275.finalproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.cmpe275.finalproject.model.Address;
import edu.sjsu.cmpe275.finalproject.model.BankAccount;
import edu.sjsu.cmpe275.finalproject.services.BankAccountService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/bank")
public class BankAccountController {

	@Autowired
	BankAccountService bankAccountService;
	
	@GetMapping("/{accountNumber}")
	public ResponseEntity<BankAccount> getAccountByID(@PathVariable (required = true, name = "accountNumber") Long accountNumber){
		
		
		/**
		 * postman
		 * 
		 * http://localhost:9091/bank/1
		 */

		BankAccount bankAccount = null;
		try {
		bankAccount = bankAccountService.getAccount(accountNumber);
		}
		catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<BankAccount>(bankAccount, HttpStatus.OK);
	}
	
	@PostMapping("")
	public ResponseEntity<BankAccount> createBankAccount(@RequestParam(required = true, name = "bankName") String bankName,
			@RequestParam(required = true, name = "country") String country,
			@RequestParam(required = true, name = "ownerName") String ownerName,
			@RequestParam(required = false, name = "currency") String currency,
			@RequestParam(required = false, name = "sendingOrReceiving") String sendingOrReceiving ,
			@RequestParam(required = false, name = "street") String street,
			@RequestParam(required = false, name = "city" ) String city,
			@RequestParam(required = false, name = "state") String state,
			@RequestParam(required = false, name = "zip") String zip){

		/**
		 * postman
		 * 
		 * http://localhost:9091/bank?bankName=HSBC&country=India&ownerName=Sindhu&currency=INR&sendingOrReceiving=Sending&street=Ram Nagar&city=Vja&state=AP&zip=234344
		 */

		try {
			Address address = new Address(street, city, state, zip);
			BankAccount bankAccount = new BankAccount(bankName, country, address, ownerName, currency, sendingOrReceiving);
			BankAccount _bankAccount = bankAccountService.saveBankAccount(bankAccount);
			return new ResponseEntity<BankAccount>(_bankAccount, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
}
