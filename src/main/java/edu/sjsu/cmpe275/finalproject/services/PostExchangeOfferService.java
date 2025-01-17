package edu.sjsu.cmpe275.finalproject.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.NoResultException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.finalproject.model.Offers;
import edu.sjsu.cmpe275.finalproject.model.Transaction;
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
		
		public List<Offers> findmyopenoffers(String username,String status) {
			List<Offers> alloffers = postexchangeofferrepository.getOpenOffers(username,status);
			return alloffers;
		}
		
		public Optional<Offers> findOfferById(long id) {
			Optional<Offers> offer = postexchangeofferrepository.findById(id);
			return offer;
		}
		
		public List<Offers> listAllOffers() {
			List<Offers> offer = postexchangeofferrepository.findAll();
			return offer;
		}

		public Offers saveExchangeOffer(Offers postoffer) {
			return postexchangeofferrepository.save(postoffer);
		}

		
		public Offers getAccount(Long accountNumber) throws NoResultException { // need to add proper exception
																						// handling
			return postexchangeofferrepository.findById(accountNumber).get();
		}

		public void deleteOfferById(Long id) {
			postexchangeofferrepository.deleteById(id);
		}
		
		public String updateStatus(Transaction trans,String status) {

			try {

				Optional<Offers> _offer = findOfferById(trans.getId());
				Offers _postOffer = null;
				if (_offer.isPresent()) {
					_postOffer = _offer.get();
					_postOffer.setOfferStatus(status);
					_postOffer = saveExchangeOffer(_postOffer);
				}

				return "Ok";
			} catch (Exception e) {
				System.err.println(e);
				return "Error";
			}
		}

		public List<Offers> getOpenOffers(String offerAccepter, String string) {
			return postexchangeofferrepository.getOpenOffers(offerAccepter,string);
		}
	}