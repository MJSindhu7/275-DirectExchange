package edu.sjsu.cmpe275.finalproject.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "offers")
public class Offers {
	
	public Offers() {
		
	}
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name ="user_name")
	private User user;
	
	@Column(name = "source_country")
	private String sourceCountry;

	@Column(name = "source_currency")
	private String sourceCurrency;

	@Column(name = "remit_amount_source")
	private double remitAmountSource;
	
	@Column(name = "remit_amount_destination")
	private double remitAmountDestination;

	@Column(name = "destination_country")
	private String destinationCountry;

	@Column(name = "destination_currency")
	private String destinationCurrency;

	@Column(name = "exchange_rate")
	private float exchangeRate;
	
	@Column(name = "expiration_date")
	private Date expirationDate;

	@Column(name = "counter_offers")
	private boolean counteroffers=true;

	@Column(name = "new_remit_amount")
	private double newRemitAmount;
	
//	@Column(name = "new_remit_amount")
//	private String newRemitAmount;

	@Column(name = "split_exchange")
	private boolean splitExchange=true;
	
	@Column(name = "offer_status")
	private String offerStatus;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getSourceCountry() {
		return sourceCountry;
	}

	public void setSourceCountry(String sourceCountry) {
		this.sourceCountry = sourceCountry;
	}

	public String getSourceCurrency() {
		return sourceCurrency;
	}

	public void setSourceCurrency(String sourceCurrency) {
		this.sourceCurrency = sourceCurrency;
	}

	
	public String getDestinationCountry() {
		return destinationCountry;
	}

	public void setDestinationCountry(String destinationCountry) {
		this.destinationCountry = destinationCountry;
	}

	public String getDestinationCurrency() {
		return destinationCurrency;
	}

	public void setDestinationCurrancy(String destinationCurrency) {
		this.destinationCurrency = destinationCurrency;
	}

	public float getExchangeRate() {
		return exchangeRate;
	}

	public void setExchangeRate(float exchangeRate) {
		this.exchangeRate = exchangeRate;
	}

	public Date getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}

	public boolean isCounteroffers() {
		return counteroffers;
	}

	public void setCounteroffers(boolean counteroffers) {
		this.counteroffers = counteroffers;
	}

	
	public double getRemitAmountSource() {
		return remitAmountSource;
	}

	public void setRemitAmountSource(double remitAmountSource) {
		this.remitAmountSource = remitAmountSource;
	}

	public double getRemitAmountDestination() {
		return remitAmountDestination;
	}

	public void setRemitAmountDestination(double remitAmountDestination) {
		this.remitAmountDestination = remitAmountDestination;
	}

	public double getNewRemitAmount() {
		return newRemitAmount;
	}

	public void setNewRemitAmount(double newRemitAmount) {
		this.newRemitAmount = newRemitAmount;
	}

	public void setDestinationCurrency(String destinationCurrency) {
		this.destinationCurrency = destinationCurrency;
	}

	public void setNewRemitAmount(Long newRemitAmount) {
		this.newRemitAmount = newRemitAmount;
	}

	public boolean isSplitExchange() {
		return splitExchange;
	}

	public void setSplitExchange(boolean splitExchange) {
		this.splitExchange = splitExchange;
	}

	public String getOfferStatus() {
		return offerStatus;
	}

	public void setOfferStatus(String offerStatus) {
		this.offerStatus = offerStatus;
	}

	@Override
	public String toString() {
		return "Offers [id=" + id + ", user=" + user + ", sourceCountry=" + sourceCountry + ", sourceCurrency="
				+ sourceCurrency + ", remitAmountSource=" + remitAmountSource + ", remitAmountDestination="
				+ remitAmountDestination + ", destinationCountry=" + destinationCountry + ", destinationCurrency="
				+ destinationCurrency + ", exchangeRate=" + exchangeRate + ", expirationDate=" + expirationDate
				+ ", counteroffers=" + counteroffers + ", newRemitAmount=" + newRemitAmount + ", splitExchange="
				+ splitExchange + ", offerStatus=" + offerStatus + "]";
	}

	
}