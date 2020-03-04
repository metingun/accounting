package com.springJpa.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "SALES_BASKET")
public class SalesBasketModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "salesBasketId", nullable = false)
    private long salesBasketId;

    @Column(name = "sales_date", nullable = false)
    private String salesDate;

    @Column(name = "TcNo", nullable = false)
    private String tcNo;

    @Column(name = "total_price", nullable = false)
    private double totalPrice;

    @Column(name = "received_payment", nullable = false)
    private double receivedPayment;

    @Column(name = "discounted_payment", nullable = false)
    private double discountedPayment;

    public SalesBasketModel(double totalPrice, String salesDate, String TcNo, double receivedPayment,
        long salesBasketId, double discountedPayment) {
        this.totalPrice = totalPrice;
        this.salesDate = salesDate;
        this.tcNo = TcNo;
        this.receivedPayment = receivedPayment;
        this.salesBasketId = salesBasketId;
        this.discountedPayment = discountedPayment;
    }

    @Override
    public String toString() {
        return "SalesModel [id=" + id + ", salesBasketId=" + salesBasketId + ", totalPrice=" + totalPrice + ", "
            + "salesDate=" + salesDate + ", TcNo=" + tcNo + ", receivedPayment=" + receivedPayment
            + ", discountedPayment=" + discountedPayment + "]";
    }
}
