package edu.sjsu.cmpe275.finalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe275.finalproject.model.Rates;

@Repository
public interface RateRepository extends JpaRepository<Rates, String> {

}
