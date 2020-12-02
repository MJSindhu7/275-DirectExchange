package edu.sjsu.cmpe275.finalproject.model;

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

import org.springframework.beans.factory.annotation.Autowired;

import edu.sjsu.cmpe275.finalproject.services.UserService;

@Entity
@Table(name = "bankaccount")
public class BankAccount {
	
	public BankAccount() {

	}

	public BankAccount(String bankName, String country, long accountNumber, String ownerName, String address,
			String currency, String sendingOrReceivings, String userName) {
		super();
		this.bankName = bankName;
		this.country = country;
		this.accountNumber = accountNumber;
		this.ownerName = ownerName;
		this.currency = currency;
		this.sendingOrReceiving = sendingOrReceivings;
		this.address = address;
	}
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name ="user_name ")
	private User user;

	@Id
	@Column(name = "account_number")
	private long accountNumber;

	@Column(name = "bank_name")
	private String bankName;

	@Column(name = "country")
	private String country;

	@Column(name = "owner_name")
	private String ownerName;

	@Column(name = "currency")
	private String currency;

	@Column(name = "sending_or_receiving")
	private String sendingOrReceiving;

	@Column(name = "address")
	private String address;

	public long getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(long accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getSendingOrReceiving() {
		return sendingOrReceiving;
	}

	public void setSendingOrReceiving(String sendingOrReceiving) {
		this.sendingOrReceiving = sendingOrReceiving;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "BankAccount [accountNumber=" + accountNumber + ", bankName=" + bankName + ", country=" + country
				+ ", ownerName=" + ownerName + ", ownerAddress=" + address + ", currency=" + currency
				+ ", sendingOrReceiving=\" + sendingOrReceiving + \"]";
	}
}
