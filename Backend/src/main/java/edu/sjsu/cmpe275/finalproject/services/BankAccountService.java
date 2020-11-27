package edu.sjsu.cmpe275.finalproject.services;

import java.util.List;

import javax.persistence.NoResultException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.finalproject.model.BankAccount;
import edu.sjsu.cmpe275.finalproject.repository.BankAccountRepository;

@Service
@Transactional
public class BankAccountService {

	@Autowired
	private BankAccountRepository bankAccountRepository;

	public List<BankAccount> listAllBankAccounts() {
		return bankAccountRepository.findAll();
	}

	public BankAccount saveBankAccount(BankAccount bankAccount) {
		return bankAccountRepository.save(bankAccount);
	}

	public BankAccount getAccount(Long accountNumber) throws NoResultException { // need to add proper exception
																					// handling
		return bankAccountRepository.findById(accountNumber).get();
	}

	public void deleteById(Long accountNumber) {
		bankAccountRepository.deleteById(accountNumber);
	}
}
