package edu.sjsu.cmpe275.finalproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.cmpe275.finalproject.model.User;
import edu.sjsu.cmpe275.finalproject.services.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserService userService;
	
	@PostMapping("")
	public ResponseEntity<User> createBankAccount(@RequestParam(required = true, name = "userName") String userName,
			@RequestParam(required = true, name = "nickName") String nickName){

		/**
		 * postman
		 * 
		 * http://localhost:9091/bank?userName=sindhu
		 */

		try {
			//Address address = new Address(street, city, state, zip);
			//BankAccount bankAccount = new BankAccount(bankName, country, address, ownerName, currency, sendingOrReceiving);
			User user = new User(userName, nickName);
			User _user = userService.saveUser(user);
			return new ResponseEntity<User>(_user, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
}
