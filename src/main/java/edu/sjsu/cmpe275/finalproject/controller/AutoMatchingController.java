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
		List<Offers> singleMatchOffers = new LinkedList<Offers>();
		List<Offers[]> splitMatchOffers = new LinkedList<Offers[]>();
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

						// Single Offer Matching
						Boolean cond1 = otherDestinationRemitAmount*0.9<=thisSourceRemitAmount && thisSourceRemitAmount<=otherDestinationRemitAmount*1.1; 
						Boolean cond2 = otherSourceRemitAmount*0.9<=thisDestinationRemitAmount && thisDestinationRemitAmount<=otherSourceRemitAmount*1.1;
						if( cond1 && cond2 ) {
							singleMatchOffers.add(offer);
						}

						// Split Offer Matching

						for(Offers splitOffer : allOffers) {
							if(!splitOffer.equals(offer) && !splitOffer.equals(presentOffer))
							{
								User splitUser = splitOffer.getUser();
								if(!splitUser.equals(thisUser)) {
									String splitSourceCurrency = splitOffer.getSourceCurrency();
									String splitDestinationCurrency = splitOffer.getDestinationCurrency();
									if(splitSourceCurrency.equals(thisSourceCurrency) && splitDestinationCurrency.equals(thisDestinationCurrency)) {
										Double searchDestinationRemitAmount = otherDestinationRemitAmount-thisSourceRemitAmount;
										Double searchSourceRemitAmount = otherSourceRemitAmount-thisDestinationRemitAmount;

										Boolean split1 = searchDestinationRemitAmount*0.9<=splitOffer.getRemitAmountSource() && splitOffer.getRemitAmountSource()<=searchDestinationRemitAmount*1.1;
										Boolean split2 = searchSourceRemitAmount*0.9<=splitOffer.getRemitAmountDestination() && splitOffer.getRemitAmountDestination()<=searchSourceRemitAmount*1.1;	
										if(split1 && split2) {
											Offers[] arr = new Offers[2];
											arr[0] = offer;
											arr[1] = splitOffer;
											splitMatchOffers.add(arr);
										}
									}
									else if(splitSourceCurrency.equals(thisDestinationCurrency) && splitDestinationCurrency.equals(thisSourceCurrency)) {
										Double searchDestinationRemitAmount = thisSourceRemitAmount-otherDestinationRemitAmount;
										Double searchSourceRemitAmount = thisDestinationRemitAmount-otherSourceRemitAmount;

										Boolean split1 = searchDestinationRemitAmount*0.9<=splitOffer.getRemitAmountDestination() && splitOffer.getRemitAmountDestination()<=searchDestinationRemitAmount*1.1;
										Boolean split2 = searchSourceRemitAmount*0.9<=splitOffer.getRemitAmountSource() && splitOffer.getRemitAmountSource()<=searchSourceRemitAmount*1.1;	
										if(split1 && split2) {
											Offers[] arr = new Offers[2];
											arr[0] = offer;
											arr[1] = splitOffer;
											if(splitMatchOffers.isEmpty()) {
												splitMatchOffers.add(arr);
											}
											else {
												for(Offers[] exists:splitMatchOffers) {
													Boolean cond = exists[1].equals(arr[0]) && exists[0].equals(arr[1]);
													if(!cond){
														splitMatchOffers.add(arr);
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}

			List<Offers> sortedOffers = singleOffersSorter(singleMatchOffers,thisSourceRemitAmount);
			
			
			for(Offers[] offers : splitMatchOffers) {
				sortedOffers.add(offers[0]);
				sortedOffers.add(offers[1]);
			}
			
			return new ResponseEntity<List<Offers>>(sortedOffers,HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}	
	}

	public List<Offers> singleOffersSorter(List<Offers> singleMatchOffers,Double targetAmount){
		SortedMap<Double,Integer> sortedMap = new TreeMap<Double, Integer>();
		for(int i = 0 ; i<singleMatchOffers.size();i++) {
			Offers offer = singleMatchOffers.get(i);
			Double diff = Math.abs(offer.getRemitAmountDestination()-targetAmount);
			sortedMap.put(diff, i);
		}

		Iterator iterator = sortedMap.keySet().iterator();
		List<Offers> sortedList = new LinkedList<Offers>();

		while(iterator.hasNext()) {
			Double key   = (Double) iterator.next();
			Integer value = (Integer) sortedMap.get(key);
			sortedList.add(singleMatchOffers.get(value));
		}
		return sortedList;
	}
}

