
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

import edu.sjsu.cmpe275.finalproject.model.Rates;
import edu.sjsu.cmpe275.finalproject.model.User;
import edu.sjsu.cmpe275.finalproject.services.RatesService;
import edu.sjsu.cmpe275.finalproject.services.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/rates")
public class RateController {

	@Autowired
	RatesService rateService;

	@PostMapping("/addrate")
	public ResponseEntity<Rates> addExhangeRate(@RequestBody Rates rate) {

		try {
			Rates _rate = rateService.saveRate(rate);
			return new ResponseEntity<Rates>(_rate, HttpStatus.OK);
		} catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getrate/{currency}")
	public ResponseEntity<Rates> getCurrencyRate(@PathVariable(required = true, name = "currency") String currency)  {
		try {
			Rates _rate = rateService.getCurrencyRate(currency);
		return new ResponseEntity<>(_rate, HttpStatus.OK);
		}catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getall")
	public ResponseEntity<List<Rates>> getAllRates()  {
		try {
			List<Rates> _rate = rateService.listAllCurrencyRates();
		return new ResponseEntity<>(_rate, HttpStatus.OK);
		}catch (Exception e) {
			System.err.println(e);
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
}
