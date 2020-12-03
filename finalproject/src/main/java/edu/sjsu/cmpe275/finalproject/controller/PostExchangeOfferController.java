package edu.sjsu.cmpe275.finalproject.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.cmpe275.finalproject.model.BankAccount;
import edu.sjsu.cmpe275.finalproject.model.Offers;
import edu.sjsu.cmpe275.finalproject.services.BankAccountService;
import edu.sjsu.cmpe275.finalproject.services.PostExchangeOfferService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/offers")
public class PostExchangeOfferController {
	@Autowired
	PostExchangeOfferService postOfferService;

	@GetMapping("/{userName}")
	public ResponseEntity<List<Offers>> getOffersForUser(
			@PathVariable(required = true, name = "userName") String userName) {

		/**
		 * postman
		 * 
		 * http://localhost:9091/bank/1
		 */

		List<Offers> postExchangeOffer = null;
		try {
			postExchangeOffer = postOfferService.findOffersForUser(userName);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Offers>>(postExchangeOffer, HttpStatus.OK);
	}

	@GetMapping("/alloffers")
	public ResponseEntity<List<Offers>> getAlloffers() {

		/**
		 * postman
		 * 
		 * http://localhost:9091/bank/1
		 */

		List<Offers> postExchangeOffer = null;
		try {
			postExchangeOffer = postOfferService.listAllOffers();
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<Offers>>(postExchangeOffer, HttpStatus.OK);
	}

	@PostMapping("/saveoffer")
	public ResponseEntity<Offers> addExchnageOffer(@RequestBody Offers offer) {

		try {

			Offers _postOffer = postOfferService.saveExchangeOffer(offer);
			return new ResponseEntity<Offers>(_postOffer, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/updateoffer")
	public ResponseEntity<Offers> updateExchnageOffer(@RequestBody Offers offer) {

		try {

			Offers _offer = postOfferService.findOfferById(offer.getId());
			Offers _postOffer = null;
//			if (_offer.isPresent()) {
//				_postOffer = _offer.get();
			_postOffer = postOfferService.saveExchangeOffer(offer);
//			}

			return new ResponseEntity<Offers>(_postOffer, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/deleteoffer/{id}")
	public ResponseEntity<Offers> deleteExchnageOffer(@PathVariable(required = true, name = "id") Long id) {

		try {

			postOfferService.deleteOfferById(id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
}
