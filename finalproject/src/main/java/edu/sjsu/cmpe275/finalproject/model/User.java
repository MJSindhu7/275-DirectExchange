package edu.sjsu.cmpe275.finalproject.model;

import java.util.List;

import javax.persistence.Column; 
import javax.persistence.Entity; 
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "user") 
public class User { 
	
	public User() {
	}

	public User(String userName, String nickName) { 
		this.userName  = userName;
		this.nickName = nickName; 
	}

	@Id
	@Column(name = "user_name") 
	private String userName ;
	
	@Column(name = "nick_name") 
	private String nickName ;
	
	@Column(name = "rating") 
	private int rating = 0;

	@OneToMany(mappedBy = "user")
	private List<BankAccount> accounts;
	
	@OneToMany(mappedBy = "user")
	private List<Offers> offers;
	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	} 
}
