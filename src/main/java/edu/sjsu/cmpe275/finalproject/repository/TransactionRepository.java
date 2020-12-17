
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
    @Query(value="update offers c set c.offerStatus = :offerStatus where c.id = :id", nativeQuery = true)
    int updateOfferStaatus(@Param("id") Long id, @Param("offerStatus") String offerStatus);
	 
	 final static String GET_INTransaction_Offers = "select * from transaction e where :username in(e.user_name,e.offer_accepter) and e.offer_status=:offer_status";
		
	 @Query(value=GET_INTransaction_Offers, nativeQuery = true)
	 List<Transaction> getInTransactionOffers(@Param("username") String username,@Param("offer_status") String offer_status);

	 final static String GET_INTransaction_history = "select * from transaction e where :username in(e.user_name,e.offer_accepter)";
	@Query(value=GET_INTransaction_history, nativeQuery = true)
	 List<Transaction> getInTransactionHistory(String username);
	
		
		


}
