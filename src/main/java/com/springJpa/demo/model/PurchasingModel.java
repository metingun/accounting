package com.springJpa.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@Table(name = "PURCHASING_DATA")
public class PurchasingModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "purchasing_date", nullable = false)
    private Date purchasingDate;

    @Column(name = "customer_account", nullable = false)
    private String customerAccount;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "purchasing_quantity", nullable = false)
    private int purchasingQuantity;

    @Column(name = "unit", nullable = false)
    private String unit;

    @Column(name = "unit_price", nullable = false)
    private int unitPrice;

    @Column(name = "total_payment", nullable = false)
    private int totalPayment;

    @Column(name = "payment_made", nullable = false)
    private int paymentMade;

    public PurchasingModel(Date purchasingDate, String customerAccount, String productName, String unit, int purchasingQuantity, int unitPrice, int totalPayment,int paymentMade) {
        this.purchasingDate = purchasingDate;
        this.productName = productName;
        this.customerAccount = customerAccount;
        this.unit = unit;
        this.purchasingQuantity = purchasingQuantity;
        this.unitPrice = unitPrice;
        this.totalPayment = totalPayment;
        this.paymentMade=paymentMade;
    }

    @Override
    public String toString() {
        return "PurchasingModel [id=" + id + ", purchasingDate=" + purchasingDate + ", productName=" + productName + ", customerAccount=" + customerAccount + ", " +
                "unit=" + unit + ", purchasingQuantity=" + purchasingQuantity + ", unitPrice=" + unitPrice + ", totalPayment=" + totalPayment+ ", paymentMade=" + paymentMade + "]";
    }
}
