package com.springJpa.demo.controller;

import com.springJpa.demo.model.SalesBasketModelList;
import com.springJpa.demo.model.SalesModel;
import com.springJpa.demo.service.SalesService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/restful/sales")
public class SalesController {

    private final
    SalesService salesService;

    public SalesController(SalesService salesService) {
        this.salesService = salesService;
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.POST)
    public List<SalesModel> getAllSales() {
        try {
            return salesService.getAllSalesData();
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @Valid String createSales(@Valid @RequestBody SalesBasketModelList modelList) {
        try {
            return salesService.createNewSalesBasket(modelList);
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @Valid SalesModel updateSales(@RequestBody SalesModel salesModel) {
        try {
            return null; //updateSetModel(purchasingModel, purchasingRepository);
        } catch (Exception e) {
            return null;
        }
    }
}
