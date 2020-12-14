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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.cmpe275.finalproject.model.BankAccount;
import edu.sjsu.cmpe275.finalproject.model.User;
import edu.sjsu.cmpe275.finalproject.services.BankAccountService;
import edu.sjsu.cmpe275.finalproject.services.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/bank")
public class BankAccountController {

	@Autowired
	BankAccountService bankAccountService;
	
	@Autowired
	UserService userService;

	@GetMapping("/{accountNumber}")
	public ResponseEntity<BankAccount> getAccountByID(
			@PathVariable(required = true, name = "accountNumber") Long accountNumber) {

		/**
		 * postman
		 * 
		 * http://localhost:9091/bank/1
		 */

		BankAccount bankAccount = null;
		try {
			bankAccount = bankAccountService.getAccount(accountNumber);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<BankAccount>(bankAccount, HttpStatus.OK);
	}
	
	@GetMapping("/byusername/{userName}")
	public ResponseEntity<List<BankAccount>> getAccountByID(@PathVariable String userName) {

		/**
		 * postman
		 * 
		 * http://localhost:9091/bank/1
		 */

		List<BankAccount> bankAccount = null;
		try {
			bankAccount = bankAccountService.getAllBankAccountsForuser(userName);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<BankAccount>>(bankAccount, HttpStatus.OK);
	}


	@GetMapping("/listbankaccounts")
	public ResponseEntity<List<BankAccount>> listbankaccounts() {

		/**
		 * postman
		 * 
		 * http://localhost:9091/bank/1
		 */

		List<BankAccount> bankAccount = null;
		try {
			bankAccount = bankAccountService.listAllBankAccounts();
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<BankAccount>>(bankAccount, HttpStatus.OK);
	}

	@PostMapping("/bankaccounts/")
	public ResponseEntity<BankAccount> createBankAccount(@RequestBody BankAccount bankaccount) {

			try {
			BankAccount _bankAccount = bankAccountService.saveBankAccount(bankaccount);
			return new ResponseEntity<BankAccount>(_bankAccount, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
}
