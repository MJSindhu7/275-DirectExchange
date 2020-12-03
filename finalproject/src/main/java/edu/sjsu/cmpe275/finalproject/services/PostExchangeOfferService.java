package edu.sjsu.cmpe275.finalproject.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.NoResultException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.finalproject.model.Offers;
import edu.sjsu.cmpe275.finalproject.repository.PostExchangeOfferRepository;

@Service
@Transactional
public class PostExchangeOfferService {

	@Autowired
	private PostExchangeOfferRepository postexchangeofferrepository;

	public List<Offers> findOffersForUser(String username) {
		List<Offers> alloffers = postexchangeofferrepository.getMyOffers(username);
		return alloffers;
	}

	public Offers findOfferById(Long id) {
		Offers offer = postexchangeofferrepository.findById(id).get();
		return offer;
	}

	public List<Offers> listAllOffers() {
		List<Offers> offer = postexchangeofferrepository.findAll();
		return offer;
	}

	public Offers saveExchangeOffer(Offers postoffer) {
		return postexchangeofferrepository.save(postoffer);
	}

	public Offers getAccount(Long accountNumber) throws NoResultException { 
		// need to add proper exception handling
		return postexchangeofferrepository.findById(accountNumber).get();
	}

	public void deleteOfferById(Long id) {
		postexchangeofferrepository.deleteById(id);
	}
}