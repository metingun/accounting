package com.springJpa.demo.repository;

import com.springJpa.demo.model.ProductTypeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductTypeModel, Long> {
}
