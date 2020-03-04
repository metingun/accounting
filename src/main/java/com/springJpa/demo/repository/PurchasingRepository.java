package com.springJpa.demo.repository;

import com.springJpa.demo.model.PurchasingModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchasingRepository extends JpaRepository<PurchasingModel, Long> {
}
