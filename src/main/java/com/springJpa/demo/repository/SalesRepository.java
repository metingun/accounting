package com.springJpa.demo.repository;

import com.springJpa.demo.model.SalesModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalesRepository extends JpaRepository<SalesModel, Long> {
}
