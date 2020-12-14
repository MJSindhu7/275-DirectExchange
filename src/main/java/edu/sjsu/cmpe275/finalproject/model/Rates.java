package edu.sjsu.cmpe275.finalproject.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "rates")
public class Rates {
	
	@Id
	@Column(name = "curr")
	private String currency;

	@Column(name = "curr_usd")
	private float currenyToUSD;
	
	@Column(name = "usd_curr")
	private float USDToCurrency;

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public float getCurrenyToUSD() {
		return currenyToUSD;
	}

	public void setCurrenyToUSD(float currenyToUSD) {
		this.currenyToUSD = currenyToUSD;
	}

	public float getUSDToCurrency() {
		return USDToCurrency;
	}

	public void setUSDToCurrency(float uSDToCurrency) {
		USDToCurrency = uSDToCurrency;
	}

	@Override
	public String toString() {
		return "Rates [currency=" + currency + ", currenyToUSD=" + currenyToUSD + ", USDToCurrency=" + USDToCurrency
				+ "]";
	}
	
	
}
