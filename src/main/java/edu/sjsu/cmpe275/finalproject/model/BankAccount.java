package edu.sjsu.cmpe275.finalproject.model;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "bankaccount")
public class BankAccount {

	public BankAccount() {

	}

	public BankAccount(String bankName, String country, Address address, String ownerName, String currency,
			String sendingOrReceivings) {
		super();
		this.bankName = bankName;
		this.country = country;
		this.ownerName = ownerName;
		this.currency = currency;
		this.sendingOrReceiving = sendingOrReceivings;
		this.address = address;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long accountNumber;

	/*public User getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(User ownerName) {
		this.ownerName = ownerName;
	}*/

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	@Column
	private String bankName;

	@Column
	private String country;

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

	/*public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address ownerAddress) {
		this.address = ownerAddress;
	}
*/
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

	@Column
	private String ownerName;
	
	/*@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "name")
	private User ownerName;*/

	@Column
	private String currency;

	@Column
	private String sendingOrReceiving;

	@Embedded
	private Address address;

	@Override
	public String toString() {
		return "BankAccount [accountNumber=" + accountNumber + ", bankName=" + bankName + ", country=" + country
				+ ", ownerName=" + ownerName + ", ownerAddress=" + address + ", currency=" + currency
				+ ", sendingOrReceiving=\" + sendingOrReceiving + \"]";
	}
}
