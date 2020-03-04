package com.springJpa.demo.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "STOCK_CARDS")
public class StockCardModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "trade_mark", nullable = false)
    private String tradeMark;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "product_type", nullable = false)
    private String productType;

    @Column(name = "barcode", nullable = false)
    private String barcode;

    public StockCardModel(String tradeMark, String productName, String productType, String barcode
    ) {
        this.tradeMark = tradeMark;
        this.productName = productName;
        this.productType=productType;
        this.barcode=barcode;
    }

    @Override
    public String toString() {
        return "StockCardModel [id=" + id + ", tradeMark=" + tradeMark + ", productName=" + productName+", " +
                "productType=" + productType+", barcode=" + barcode+ "]";
    }
}
