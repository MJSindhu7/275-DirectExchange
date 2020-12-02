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

	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name ="user_name ")
	private User user;
	
	@Column(name = "nick_name")
	private String nickName;

	@Column(name = "source_country")
	private String sourceCountry;

	@Column(name = "source_currency")
	private String sourceCurrency;

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

	@Column(name = "new_remit_amount")
	private Long newRemitAmount;
	
//	@Column(name = "new_remit_amount")
//	private String newRemitAmount;

	@Column(name = "split_exchange")
	private boolean splitExchange=true;

	@Column(name = "split_exchange_party_1")
	private String splitExchangeParty1;
	
	@Column(name = "split_exchange_party_2")
	private String splitExchangeParty2;
	
	@Column(name = "user_rating")
	private String userRating;
	
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

	public String getSourceCurrency() {
		return sourceCurrency;
	}

	public void setSourceCurrency(String sourceCurrency) {
		this.sourceCurrency = sourceCurrency;
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

	public Long getNewRemitAmount() {
		return newRemitAmount;
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

	public String getSplitExchangeParty1() {
		return splitExchangeParty1;
	}

	public void setSplitExchangeParty1(String splitExchangeParty1) {
		this.splitExchangeParty1 = splitExchangeParty1;
	}

	public String getSplitExchangeParty2() {
		return splitExchangeParty2;
	}

	public void setSplitExchangeParty2(String splitExchangeParty2) {
		this.splitExchangeParty2 = splitExchangeParty2;
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

	@Override
	public String toString() {
		return "Offers [id=" + id + ", user=" + user + ", nickName=" + nickName + ", sourceCountry=" + sourceCountry
				+ ", sourceCurrency=" + sourceCurrency + ", remitAmount=" + remitAmount + ", destinationCountry="
				+ destinationCountry + ", destinationCurrancy=" + destinationCurrancy + ", exchangeRate=" + exchangeRate
				+ ", expirationDate=" + expirationDate + ", counteroffers=" + counteroffers + ", newRemitAmount="
				+ newRemitAmount + ", splitExchange=" + splitExchange + ", splitExchangeParty1=" + splitExchangeParty1
				+ ", splitExchangeParty2=" + splitExchangeParty2 + ", userRating=" + userRating + ", offerStatus="
				+ offerStatus + "]";
	}
	
}
