package com.springJpa.demo.repository;

import com.springJpa.demo.model.StockCardModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<StockCardModel, Long> {
}
