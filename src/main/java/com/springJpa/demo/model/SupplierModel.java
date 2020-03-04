package com.springJpa.demo.model;

import java.util.Date;
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
@Table(name = "SUPPLIERS")
public class SupplierModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "create_date", nullable = false)
    private String createDate;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "town", nullable = false)
    private String town;

    @Column(name = "district", nullable = false)
    private String district;

    @Column(name = "address", nullable = false)
    private String address;

    public SupplierModel(String createDate, String name, String surname, String phoneNumber, String companyName,
        String city, String town,
        String district, String address) {
        this.name = name;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
        this.companyName = companyName;
        this.city = city;
        this.town = town;
        this.district = district;
        this.address = address;
        this.createDate = createDate;
    }

    @Override
    public String toString() {
        return "SupplierModel [id=" + id + ", name=" + name + ", surname=" + surname + ", phoneNumber=" + phoneNumber
            + ", " + "companyName=" + companyName + ", city=" + city + ", town=" + town + ", district=" + district
            + ", address=" + address + ", createDate=" + createDate + "]";
    }

}
