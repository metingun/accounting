package com.springJpa.demo.controller;

import com.springJpa.demo.model.PurchasingModel;
import com.springJpa.demo.repository.PurchasingRepository;
import com.springJpa.demo.utils.CustomersSuppliersUtilService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/restful/purchasing")
public class PurchasingController {

    private final PurchasingRepository purchasingRepository;

    public PurchasingController(PurchasingRepository purchasingRepository) {
        this.purchasingRepository = purchasingRepository;
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.POST)
    public List<PurchasingModel> getAllPurchasing() {
        try {
            return purchasingRepository.findAll();
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @Valid PurchasingModel createPurchasing(@Valid @RequestBody PurchasingModel purchasingModel) {
        try {
            return purchasingRepository.save(purchasingModel);
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @Valid PurchasingModel updatePurchasing(@RequestBody PurchasingModel purchasingModel) {
        try {
            return null; //updateSetModel(purchasingModel, purchasingRepository);
        } catch (Exception e) {
            return null;
        }
    }
}

