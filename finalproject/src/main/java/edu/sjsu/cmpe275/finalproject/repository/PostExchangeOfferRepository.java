package edu.sjsu.cmpe275.finalproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe275.finalproject.model.Offers;


@Repository
public interface PostExchangeOfferRepository extends JpaRepository<Offers, Long> {

//	@Query(value="select * from Offers e where e.user_name=:user_name", nativeQuery = true)
//	List<Offers> findAllOffers(@Param("user_name") String userName);
	
	 @Query(value="select * from Offers e where e.user_name=:user_name order by field(offer_status,\"Open\",\"CounterMade\",\"InTransaction\",\"Fulfilled\",\"Expired\")", nativeQuery = true)
	 List<Offers> getMyOffers(@Param("user_name") String userName);
}

