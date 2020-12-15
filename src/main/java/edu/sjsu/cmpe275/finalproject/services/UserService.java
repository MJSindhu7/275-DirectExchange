package edu.sjsu.cmpe275.finalproject.services;
import java.util.List;

import javax.persistence.NoResultException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.finalproject.model.BankAccount;
import edu.sjsu.cmpe275.finalproject.model.User;
import edu.sjsu.cmpe275.finalproject.repository.UserRepository;

@Service
@Transactional
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public List<User> listAllUsers() {
		return userRepository.findAll();
	}

	public User saveUser(User user) {
		return userRepository.save(user);
	}

  public User getAccount(String userName) throws NoResultException {
		return userRepository.findById(userName).get(); }

	public void deleteById(String accountNumber) {
		userRepository.deleteById(accountNumber);
	}
	
	public String getNickName(String user_name) {
		return userRepository.getNick(user_name);
		
	}
	
	public void updateUserRating (String user_name, String rating) {
		userRepository.updateUserRating(user_name, rating);
	}

	public void updateUserName(String user_name, String nick_name) {
		userRepository.updateUserName(user_name, nick_name);
		
	}

}
