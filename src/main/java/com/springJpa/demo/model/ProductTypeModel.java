package com.springJpa.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "PRODUCT_TYPES")
public class ProductTypeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "product_type", nullable = false)
    private String productTypeName;

    public ProductTypeModel(String productTypeName){
        this.productTypeName=productTypeName;
    }

    @Override
    public String toString() {
        return "ProductTypeModel [id=" + id + ", productTypeName=" + productTypeName+ "]";
    }
}
