package edu.sjsu.cmpe275.finalproject.services;
import java.util.List;

import javax.persistence.NoResultException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.finalproject.model.BankAccount;
import edu.sjsu.cmpe275.finalproject.model.Rates;
import edu.sjsu.cmpe275.finalproject.model.User;
import edu.sjsu.cmpe275.finalproject.repository.RateRepository;
import edu.sjsu.cmpe275.finalproject.repository.UserRepository;

@Service
@Transactional
public class RatesService {

	@Autowired
	private RateRepository rateRepository;
	
	public List<Rates> listAllCurrencyRates(){
		return rateRepository.findAll();
	}

	public Rates saveRate(Rates rate) {
		return rateRepository.save(rate);
	}

  public Rates getCurrencyRate(String currency) throws NoResultException {
		return rateRepository.findById(currency).get(); }

	public void deleteById(String currency) {
		rateRepository.deleteById(currency);
	}
	

}
