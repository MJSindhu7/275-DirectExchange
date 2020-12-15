package edu.sjsu.cmpe275.finalproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe275.finalproject.model.Offers;


@Repository
public interface PostExchangeOfferRepository extends JpaRepository<Offers, Long> {

//	@Query(value="select * from Offers e where e.user_name=:user_name", nativeQuery = true)
//	List<Offers> findAllOffers(@Param("user_name") String userName);
	
	final static String GET_OFFERS_QUERY = "select * from Offers e where e.user_name=:user_name order by field(offer_status,\"Open\",\"CounterMade\",\"InTransaction\",\"Fulfilled\",\"Expired\")";

	//Filters for offers
	final static String GET_ACTIVE_OFFERS_QUERY = "select * from offers e where e.offer_status=:offer_status";
	final static String FILTER_OFFERS_BY_SOURCE_CURRENCY_QUERY = "select * from offers e where e.source_currency=:source_currency";
	final static String FILTER_OFFERS_BY_SOURCE_CURRENCY_AMOUNT_QUERY = "select * from offers e where e.remit_amount_source=:remit_amount_source";
	final static String FILTER_OFFERS_BY_DESTINATION_CURRENCY_QUERY = "select * from offers e where e.destination_currency=:destination_currency";
	final static String FILTER_OFFERS_BY_DESTINATION_CURRENCY_AMOUNT_QUERY = "select * from offers e where e.remit_amount_destination=:remit_amount_destination";
	
	
	 @Query(value=GET_OFFERS_QUERY, nativeQuery = true)
	 List<Offers> getMyOffers(@Param("user_name") String user_name);
	 
	 @Modifying(clearAutomatically = true)
	    @Query("UPDATE Offers c SET c.offer_status = :offer_status WHERE c.id = :id")
	    int updateOfferStaatus(@Param("id") Long id, @Param("offerStatus") String offerStatus);

	//Filters for offers
	@Query(value=GET_ACTIVE_OFFERS_QUERY, nativeQuery = true)
	List<Offers> getActiveOffers(@Param("offer_status") String offer_status);

	@Query(value=FILTER_OFFERS_BY_SOURCE_CURRENCY_QUERY, nativeQuery = true)
	List<Offers> getOffersSourceCurrency(@Param("source_currency") String source_currency);

	@Query(value=FILTER_OFFERS_BY_SOURCE_CURRENCY_AMOUNT_QUERY, nativeQuery = true)
	List<Offers> getOffersRemitAmountSource(@Param("remit_amount_source") String remit_amount_source);

	@Query(value=FILTER_OFFERS_BY_DESTINATION_CURRENCY_QUERY, nativeQuery = true)
	List<Offers> getOffersDestinationCurrency(@Param("destination_currency") String destination_currency);

	@Query(value=FILTER_OFFERS_BY_DESTINATION_CURRENCY_AMOUNT_QUERY, nativeQuery = true)
	List<Offers> getOffersRemitAmountDestination(@Param("remit_amount_destination") String remit_amount_destination);
}


