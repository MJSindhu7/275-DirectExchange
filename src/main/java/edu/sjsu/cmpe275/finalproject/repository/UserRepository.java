package edu.sjsu.cmpe275.finalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe275.finalproject.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

	final static String GET_NICKNAME_QUERY = "select nick_name from user where user_name=:user_name";
	final static String UPDATE_RATING_QUERY = "update user set rating=:rating where user_name=:user_name";
	
	@Query(value=GET_NICKNAME_QUERY, nativeQuery = true)
	String getNick(@Param("user_name") String user_name);

	@Query(value=UPDATE_RATING_QUERY, nativeQuery = true)
	void updateUserRating(String user_name, String rating);

}
