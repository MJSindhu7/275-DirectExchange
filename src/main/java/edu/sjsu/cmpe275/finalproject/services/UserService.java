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

	/*public User getAccount(Long userName) throws NoResultException { // need to add proper exception
																					// handling
		return userRepository.findById(userName).get();
	}

	public void deleteById(Long accountNumber) {
		userRepository.deleteById(accountNumber);
	}*/
}
