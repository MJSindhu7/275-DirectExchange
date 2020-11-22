package edu.sjsu.cmpe275.finalproject.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {
	public User() {

	}

	public User(String userName, String nickName) {
		this.userName = userName;
		this.nickName = nickName;
	}

	/*public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
*/
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

/*	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;*/

	@Id
	@Column
	private String userName;

	@Column
	private String nickName;
}
