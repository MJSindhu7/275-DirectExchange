package edu.sjsu.cmpe275.finalproject.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "offers")
public class Offers {

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(name = "user_name")
	private String userName;
	
	@Column(name = "nick_name")
	private String nickName;

	

	@Column(name = "source_country")
	private String sourceCountry;

	@Column(name = "source_currancy")
	private String sourceCurrancy;

	@Column(name = "remit_amount")
	private String remitAmount;

	@Column(name = "destination_country")
	private String destinationCountry;

	@Column(name = "destination_currancy")
	private String destinationCurrancy;


	@Column(name = "exchange_rate")
	private float exchangeRate;
	
	@Column(name = "expiration_date")
	private Date expirationDate;

	@Column(name = "counter_offers")
	private boolean counteroffers=true;

//	@Column(name = "new_remit_amount")
//	private long newRemitAmount;
	
	@Column(name = "new_remit_amount")
	private String newRemitAmount;

	@Column(name = "split_exchange")
	private boolean splitExchange=true;

	@Column(name = "split_exchange_parties")
	private String splitExchangeParties;
	
	@Column(name = "user_rating")
	private String userRating;
	
	@Column(name = "offer_status")
	private String offerStatus;

	


	public String getUser_rating() {
		return userRating;
	}



	public void setUser_rating(String user_rating) {
		this.userRating = user_rating;
	}



	public String getOffer_status() {
		return offerStatus;
	}



	public void setOffer_status(String offer_status) {
		this.offerStatus = offer_status;
	}



	
	
	
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



	public String getSourceCountry() {
		return sourceCountry;
	}



	public void setSourceCountry(String sourceCountry) {
		this.sourceCountry = sourceCountry;
	}



	public String getSourceCurrancy() {
		return sourceCurrancy;
	}



	public void setSourceCurrancy(String sourceCurrancy) {
		this.sourceCurrancy = sourceCurrancy;
	}



	public String getRemitAmount() {
		return remitAmount;
	}



	public void setRemitAmount(String remitAmount) {
		this.remitAmount = remitAmount;
	}



	public String getDestinationCountry() {
		return destinationCountry;
	}



	public void setDestinationCountry(String destinationCountry) {
		this.destinationCountry = destinationCountry;
	}



	public String getDestinationCurrancy() {
		return destinationCurrancy;
	}



	public void setDestinationCurrancy(String destinationCurrancy) {
		this.destinationCurrancy = destinationCurrancy;
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



	public String getNewRemitAmount() {
		return newRemitAmount;
	}



	public void setNewRemitAmount(String newRemitAmount) {
		this.newRemitAmount = newRemitAmount;
	}



	public boolean isSplitExchange() {
		return splitExchange;
	}



	public void setSplitExchange(boolean splitExchange) {
		this.splitExchange = splitExchange;
	}



	public String getSplitExchangeParties() {
		return splitExchangeParties;
	}



	public void setSplitExchangeParties(String splitExchangeParties) {
		this.splitExchangeParties = splitExchangeParties;
	}



	public String getNickName() {
		return nickName;
	}



	public void setNickName(String nickName) {
		this.nickName = nickName;
	}



	public String getUserRating() {
		return userRating;
	}



	public void setUserRating(String userRating) {
		this.userRating = userRating;
	}



	public String getOfferStatus() {
		return offerStatus;
	}



	public void setOfferStatus(String offerStatus) {
		this.offerStatus = offerStatus;
	}



//	@Override
//	public String toString() {
//		return "BankAccount [accountNumber=" + accountNumber + ", bankName=" + bankName + ", country=" + country
//				+ ", ownerName=" + ownerName + ", ownerAddress=" + address + ", currency=" + currency
//				+ ", sendingOrReceiving=\" + sendingOrReceiving + \"]";
//	}
}
