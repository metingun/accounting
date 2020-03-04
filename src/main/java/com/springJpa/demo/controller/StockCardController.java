package com.springJpa.demo.controller;

import com.springJpa.demo.model.ResponseModel;
import com.springJpa.demo.model.StockCardModel;
import com.springJpa.demo.service.StockCardService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/restful/products")
public class StockCardController {

    private final
    StockCardService stockCardService;

    public StockCardController(StockCardService stockCardService) {
        this.stockCardService = stockCardService;
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.POST)
    public List<StockCardModel> getProduct() {
        try {
            return stockCardService.getAllProductData();
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @Valid ResponseModel createProduct(@Valid @RequestBody StockCardModel stockCardModel) {
        try {
            return stockCardService.controlDublicateProduct(stockCardModel);
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @Valid StockCardModel updateProduct(@RequestBody StockCardModel stockCardModel) {
        try {
            return stockCardService.updateSetModel(stockCardModel);
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public @Valid String deleteProduct(@RequestBody String barcode) {
        try {
            return stockCardService.deleteCustomerAccount(barcode);
        } catch (Exception e) {
            return null;
        }
    }
}
