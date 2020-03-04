package com.springJpa.demo.service;

import com.springJpa.demo.model.SalesBasketModelList;
import com.springJpa.demo.model.SalesModel;
import com.springJpa.demo.repository.SalesRepository;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class SalesService {

    private static final DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
    private SalesRepository salesRepository;

    public SalesService(SalesRepository salesRepository) {
        this.salesRepository = salesRepository;
    }

    public List<SalesModel> getAllSalesData() {
        return salesRepository.findAll();
    }

    public String createNewSalesBasket(SalesBasketModelList modelList) {
        Date date = new Date();
        for (SalesModel model : modelList.getBasketModelList()) {
            model.setSalesDate(dateFormat.format(date));
            salesRepository.save(model);
        }
        return "Success";
    }
}
