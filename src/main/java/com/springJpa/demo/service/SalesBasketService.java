package com.springJpa.demo.service;

import com.springJpa.demo.model.SalesBasketModel;
import com.springJpa.demo.repository.SalesBasketRepository;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class SalesBasketService {

    private static final DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
    private SalesBasketRepository salesBasketRepository;

    public SalesBasketService(SalesBasketRepository salesBasketRepository) {
        this.salesBasketRepository = salesBasketRepository;
    }

    public List<SalesBasketModel> getAllSalesBasketData() {
        return salesBasketRepository.findAll();
    }

    public String createNewSalesBasket(SalesBasketModel salesBasketModel) {
        Date date = new Date();
        salesBasketModel.setSalesDate(dateFormat.format(date));
        salesBasketRepository.save(salesBasketModel);
        return "Success";
    }
}
