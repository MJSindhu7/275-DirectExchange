package edu.sjsu.cmpe275.finalproject.controller;

import java.util.Comparator;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.cmpe275.finalproject.model.Offers;
import edu.sjsu.cmpe275.finalproject.model.User;
import edu.sjsu.cmpe275.finalproject.services.PostExchangeOfferService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/automatch")
public class AutoMatchingController {
	
	@Autowired
	PostExchangeOfferService postOfferService;

	@GetMapping("/getOffers/{offer_id}")  //{user_name}/ @PathVariable(required = true, name = "user_name") String userName,
	public ResponseEntity<List<Offers>> getAutoMatchedOffers(@PathVariable(required = true, name = "offer_id") Long offerID){
	
		List<Offers> allOffers = null;
		Offers presentOffer = null;
		List<Offers> resultingOffers = new LinkedList<Offers>();
		try {
			allOffers = postOfferService.listAllOffers();
			presentOffer = postOfferService.findOfferById(offerID).get();
			
			User thisUser = presentOffer.getUser();
			String thisSourceCurrency = presentOffer.getSourceCurrency();
			String thisDestinationCurrency = presentOffer.getDestinationCurrency();
			Double thisSourceRemitAmount = presentOffer.getRemitAmountSource();
			Double thisDestinationRemitAmount = presentOffer.getRemitAmountDestination();

			
			for(Offers offer : allOffers) {
				User otherUser = offer.getUser();	
				if(!otherUser.equals(thisUser)) {
					String otherSourceCurrency = offer.getSourceCurrency();
					String otherDestinationCurrency = offer.getDestinationCurrency();
					if(thisSourceCurrency.equals(otherDestinationCurrency) && thisDestinationCurrency.equals(otherSourceCurrency)) {
						Double otherSourceRemitAmount = offer.getRemitAmountSource();
						Double otherDestinationRemitAmount = offer.getRemitAmountDestination();
						Boolean cond1 = otherDestinationRemitAmount*0.9<=thisSourceRemitAmount && thisSourceRemitAmount<=otherDestinationRemitAmount*1.1; 
						Boolean cond2 = otherSourceRemitAmount*0.9<=thisDestinationRemitAmount && thisDestinationRemitAmount<=otherSourceRemitAmount*1.1;
						if( cond1 && cond2 ) {
							resultingOffers.add(offer);
						}
					}
				}
			}
			
			List<Offers> sortedOffers = singleOffersSorter(resultingOffers,thisSourceRemitAmount);
			return new ResponseEntity<List<Offers>>(sortedOffers,HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
	}
	
	public List<Offers> singleOffersSorter(List<Offers> resultingOffers,Double targetAmount){
		SortedMap<Double,Integer> sortedMap = new TreeMap<Double, Integer>();
		for(int i = 0 ; i<resultingOffers.size();i++) {
			Offers offer = resultingOffers.get(i);
			Double diff = Math.abs(offer.getRemitAmountDestination()-targetAmount);
			sortedMap.put(diff, i);
		}
		
		Iterator iterator = sortedMap.keySet().iterator();
		List<Offers> sortedList = new LinkedList<Offers>();
		
		while(iterator.hasNext()) {
			Double key   = (Double) iterator.next();
		    Integer value = (Integer) sortedMap.get(key);
		    sortedList.add(resultingOffers.get(value));
		}
		return sortedList;
	}
}

