package edu.sjsu.cmpe275.finalproject.model;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class Address {

	public Address(){
		
	}

	public Address(String street, String city, String state, String zip) {
		super();
		this.street = street;
		this.city = city;
		this.state = state;
		this.zip = zip;
	}

	@Column(name = "street", table = "bankaccount")
	private String street;

	@Column(name = "city", table = "bankaccount")
	private String city;

	@Column(name = "state", table = "bankaccount")
	private String state;

	@Column(name = "zip", table = "bankaccount")
	private String zip;

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}
	
	@Override
	public String toString() {
		return "Address [street=" + street + ", city=" + city + ", state=" + state + ", zip=" + zip + "]";
	}
		
	@Override
	public int hashCode() {
		return Objects.hash(city, state, street, zip);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Address other = (Address) obj;
		return Objects.equals(city, other.city) && Objects.equals(state, other.state)
				&& Objects.equals(street, other.street) && Objects.equals(zip, other.zip);
	}
	
	public Address clone() {
		Address address = new Address();
		address.setCity(this.getCity());
		address.setState(this.getState());
		address.setStreet(this.getStreet());
		address.setZip(this.getZip());
		return address;
	} 
}
