package edu.sjsu.cmpe275.finalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe275.finalproject.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
