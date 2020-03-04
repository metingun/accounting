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
@Table(name = "SALES_DATA")
public class SalesModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "salesBasketId", nullable = false)
    private long salesBasketId;

    @Column(name = "sales_date", nullable = false)
    private String salesDate;

    @Column(name = "TcNo", nullable = false)
    private String tcNo;

    @Column(name = "trade_mark", nullable = false)
    private String tradeMark;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "barcode", nullable = false)
    private String barcode;

    @Column(name = "unit_price", nullable = false)
    private double unitPrice;

    @Column(name = "piece", nullable = false)
    private int piece;

    @Column(name = "total_price", nullable = false)
    private double totalPrice;

    public SalesModel(String tradeMark, String productName, String barcode, double unitPrice,
        int piece, double totalPrice, String salesDate, String TcNo, long salesBasketId) {
        this.tradeMark = tradeMark;
        this.productName = productName;
        this.barcode = barcode;
        this.unitPrice = unitPrice;
        this.piece = piece;
        this.totalPrice = totalPrice;
        this.salesDate = salesDate;
        this.tcNo = TcNo;
        this.salesBasketId = salesBasketId;
    }

    @Override
    public String toString() {
        return "SalesModel [id=" + id + ", tradeMark=" + tradeMark + ", productName=" + productName + ", barcode="
            + barcode + ", " + ", salesBasketId=" + salesBasketId + ", unitPrice=" + unitPrice + ", piece="
            + piece + ", totalPrice=" + totalPrice + ", salesDate=" + salesDate
            + ", TcNo=" + tcNo + "]";
    }
}
