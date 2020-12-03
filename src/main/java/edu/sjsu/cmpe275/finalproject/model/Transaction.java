package edu.sjsu.cmpe275.finalproject.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "transaction")

public class Transaction {

	
//	counteroffers: true
//	destinationCountry: "USA"
//	destinationCurrency: "USD"
//	exchangeRate: 72.02
//	expirationDate: "2020-11-09"
//	id: 1
//	newRemitAmount: 0
//	nickName: "Pragati"
//	offerAccepter: "advik.shinde@gmail.com"
//	offerStatus: "InTransaction"
//	remitAmount: 2200
//	sourceCountry: "India"
//	sourceCurrency: "INR"
//	splitExchange: true
//	split_exchange_partie1: ""
//	split_exchange_partie2: ""
//	split_exchange_partie3: ""
//	userName: "pragati.shinde@gmail.com"
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "timestamp")
	private Date Timestamp;
	
	@Column(name = "offer_accepter")
	private String offerAccepter;
	
	
	@Column(name = "userName")
	private String userName;


	@Column(name = "nick_name")
	private String nickName;

	@Column(name = "source_country")
	private String sourceCountry;

	@Column(name = "source_currancy")
	private String sourceCurrency;

	@Column(name = "remit_amount")
	private double remitAmount;

	@Column(name = "destination_country")
	private String destinationCountry;

	@Column(name = "destination_currancy")
	private String destinationCurrency;

	@Column(name = "exchange_rate")
	private float exchangeRate;

	@Column(name = "expiration_date")
	private Date expirationDate;

	@Column(name = "counter_offers")
	private boolean counteroffers = true;


	@Column(name = "new_remit_amount")
	private double newRemitAmount;

	@Column(name = "split_exchange")
	private boolean splitExchange = true;

	@Column(name = "split_exchange_partie1")
	private String splitExchangePartie1;

	@Column(name = "split_exchange_partie2")
	private String splitExchangePartie2;

	@Column(name = "split_exchange_partie3")
	private String splitExchangePartie3;

	
	@Column(name = "offer_status")
	private String offerStatus;

	@Column(name = "service_fee")
	private float serviceFee;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	
	

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public double getRemitAmount() {
		return remitAmount;
	}

	public void setRemitAmount(double remitAmount) {
		this.remitAmount = remitAmount;
	}

	public double getNewRemitAmount() {
		return newRemitAmount;
	}

	public void setNewRemitAmount(double newRemitAmount) {
		this.newRemitAmount = newRemitAmount;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getSourceCountry() {
		return sourceCountry;
	}

	public void setSourceCountry(String sourceCountry) {
		this.sourceCountry = sourceCountry;
	}

	
	public String getDestinationCountry() {
		return destinationCountry;
	}

	public void setDestinationCountry(String destinationCountry) {
		this.destinationCountry = destinationCountry;
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


	public boolean isSplitExchange() {
		return splitExchange;
	}

	public void setSplitExchange(boolean splitExchange) {
		this.splitExchange = splitExchange;
	}

	public String getSplitExchangePartie1() {
		return splitExchangePartie1;
	}

	public void setSplitExchangePartie1(String splitExchangePartie1) {
		this.splitExchangePartie1 = splitExchangePartie1;
	}

	public String getSplitExchangePartie2() {
		return splitExchangePartie2;
	}

	public void setSplitExchangePartie2(String splitExchangePartie2) {
		this.splitExchangePartie2 = splitExchangePartie2;
	}

	public String getSplitExchangePartie3() {
		return splitExchangePartie3;
	}

	public void setSplitExchangePartie3(String splitExchangePartie3) {
		this.splitExchangePartie3 = splitExchangePartie3;
	}

	

	public String getSourceCurrency() {
		return sourceCurrency;
	}

	public void setSourceCurrency(String sourceCurrency) {
		this.sourceCurrency = sourceCurrency;
	}

	public String getDestinationCurrency() {
		return destinationCurrency;
	}

	public void setDestinationCurrency(String destinationCurrency) {
		this.destinationCurrency = destinationCurrency;
	}

	public String getOfferStatus() {
		return offerStatus;
	}

	public void setOfferStatus(String offerStatus) {
		this.offerStatus = offerStatus;
	}

	
	public float getServiceFee() {
		return serviceFee;
	}

	public void setServiceFee(float serviceFee) {
		this.serviceFee = serviceFee;
	}

	public Date getTimestamp() {
		return Timestamp;
	}

	public void setTimestamp(Date timestamp) {
		Timestamp = timestamp;
	}

	public String getOfferAccepter() {
		return offerAccepter;
	}

	public void setOfferAccepter(String offerAccepter) {
		this.offerAccepter = offerAccepter;
	}

}
