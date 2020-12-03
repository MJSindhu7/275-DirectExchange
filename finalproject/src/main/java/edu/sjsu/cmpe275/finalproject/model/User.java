
package edu.sjsu.cmpe275.finalproject.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {
	public User() {

	}

	@Id
	@Column(name = "user_name")
	private String userName;

	@Column(name = "nick_name")
	private String nickName;

//	@OneToMany(mappedBy = "user")
//	private List<BankAccount> bankaccounts;

	public User(String userName, String nickName) {
		this.userName = userName;
		this.nickName = nickName;
	}

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

//	public List<BankAccount> getBankaccounts() {
//		return bankaccounts;
//	}
//
//	public void setBankaccounts(List<BankAccount> bankaccounts) {
//		this.bankaccounts = bankaccounts;
//	}
}
