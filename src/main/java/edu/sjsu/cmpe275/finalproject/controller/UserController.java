
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.cmpe275.finalproject.model.User;
import edu.sjsu.cmpe275.finalproject.model.Transaction;
import edu.sjsu.cmpe275.finalproject.services.TransactionService;
import edu.sjsu.cmpe275.finalproject.services.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService userService;
	
	@Autowired
	TransactionService transactionService;

	@PostMapping("/adduser")
	public ResponseEntity<User> createBankAccount(@RequestBody User user) {

		try {
			User _user = userService.saveUser(user);
			return new ResponseEntity<User>(_user, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	@GetMapping("/getuserNickname/{user_name}")
	public ResponseEntity<String> getUserNickname(@PathVariable(required = true, name = "user_name") String user_name)  {

		/*try {
			User _user = userService.saveUser(user);
			return new ResponseEntity<User>
			(_user, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}*/
		try {
			String nickName = userService.getNickName(user_name);
		return new ResponseEntity<>(nickName, HttpStatus.OK);
		}catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/updaterRating/{user_name}")
	public ResponseEntity<String> updateUserRating(@PathVariable(required = true, name = "user_name") String user_name)  {
		
		List<Transaction> allTransactionbythisUser = null;
		int rating = 0;
		try {
			allTransactionbythisUser = transactionService.getTransactionHistory(user_name);
			int totalTransDone = allTransactionbythisUser.size();
			int failedTransCount = 0;
			if(totalTransDone>0) {
				for (Transaction trans : allTransactionbythisUser ) {
					String transStatus = trans.getOfferStatus().toLowerCase();
					// have to check here 
					if(transStatus.equals("expired")) {
						failedTransCount++;
					}
				}
				float ratio =  failedTransCount/totalTransDone;
				rating = Math.round((1-ratio)*4) +1 ;
			}
		String strRating = "";	
		if(rating==0) {
			 strRating  = "N/A";
		}
		else {
			 strRating  = Integer.toString(rating);
		}
		userService.updateUserRating(user_name, strRating);	
		return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
