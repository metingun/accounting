package com.springJpa.demo.repository;

import com.springJpa.demo.model.SalesBasketModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesBasketRepository extends JpaRepository<SalesBasketModel, Long> {

}
