
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
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	 @Modifying(clearAutomatically = true)
	    @Query("UPDATE Offers c SET c.offerStatus = :offerStatus WHERE c.id = :id")
	    int updateOfferStaatus(@Param("id") Long id, @Param("offerStatus") String offerStatus);
	 
	 final static String GET_INTransaction_Offers = "select * from Transaction e where :username IN(e.user_name,e.offer_accepter) and e.offer_status=:offer_status";
		
	 @Query(value=GET_INTransaction_Offers, nativeQuery = true)
	 List<Transaction> getInTransactionOffers(@Param("username") String username,@Param("offer_status") String offer_status);

	 final static String GET_INTransaction_history = "select * from Transaction e where e.user_name=:username";
		
	 @Query(value=GET_INTransaction_history, nativeQuery = true)
	 List<Transaction> getInTransactionHistory(String username);
	

}
