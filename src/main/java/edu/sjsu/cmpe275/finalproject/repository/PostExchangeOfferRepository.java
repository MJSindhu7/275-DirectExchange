package edu.sjsu.cmpe275.finalproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe275.finalproject.model.Offers;
import edu.sjsu.cmpe275.finalproject.model.Transaction;


@Repository
public interface PostExchangeOfferRepository extends JpaRepository<Offers, Long> {

//	@Query(value="select * from Offers e where e.user_name=:user_name", nativeQuery = true)
//	List<Offers> findAllOffers(@Param("user_name") String userName);
	
	final static String GET_OFFERS_QUERY = "select * from Offers e where e.user_name=:user_name order by field(offer_status,\"Open\",\"CounterMade\",\"InTransaction\",\"Fulfilled\",\"Expired\")";
	
	 @Query(value=GET_OFFERS_QUERY, nativeQuery = true)
	 List<Offers> getMyOffers(@Param("user_name") String user_name);
	 
	 @Modifying(clearAutomatically = true)
	    @Query("UPDATE Offers c SET c.offerStatus = :offerStatus WHERE c.id = :id")
	    int updateOfferStaatus(@Param("id") Long id, @Param("offerStatus") String offerStatus);
	 
	 final static String GET_Open_Offers = "select * from Offers e where e.user_name=:user_name and e.offer_status=:offer_status";
	 @Query(value=GET_Open_Offers, nativeQuery = true)
	 List<Offers> getOpenOffers(@Param("user_name") String username,@Param("offer_status") String offer_status);

	
}


