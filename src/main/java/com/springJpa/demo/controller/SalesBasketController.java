package com.springJpa.demo.controller;

import com.springJpa.demo.model.SalesBasketModel;
import com.springJpa.demo.service.SalesBasketService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/restful/salesBasket")
public class SalesBasketController {

    private final
    SalesBasketService salesBasketService;

    public SalesBasketController(SalesBasketService salesBasketService) {
        this.salesBasketService = salesBasketService;
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.POST)
    public List<SalesBasketModel> getAllSalesBasket() {
        try {
            return salesBasketService.getAllSalesBasketData();
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @Valid String createSalesBasket(@Valid @RequestBody SalesBasketModel salesBasketModel) {
        try {
            return salesBasketService.createNewSalesBasket(salesBasketModel);
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @Valid SalesBasketModel updateSalesBasket(@RequestBody SalesBasketModel salesBasketModel) {
        try {
            return null; //updateSetModel(purchasingModel, purchasingRepository);
        } catch (Exception e) {
            return null;
        }
    }
}
