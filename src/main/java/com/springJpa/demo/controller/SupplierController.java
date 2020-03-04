package com.springJpa.demo.controller;

import com.springJpa.demo.model.ResponseModel;
import com.springJpa.demo.model.SupplierModel;
import com.springJpa.demo.service.SupplierService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/restful/suppliers")
public class SupplierController {

    private final SupplierService supplierService;

    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }


    @RequestMapping(value = "/getAll", method = RequestMethod.POST)
    public List<SupplierModel> getAllSupplier() {
        try {
            return supplierService.getAllSupplierData();
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @Valid ResponseModel createSupplier(@Valid @RequestBody SupplierModel supplierModel) {
        try {
            return supplierService.controlDublicateSupplier(supplierModel);
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @Valid SupplierModel updateSupplier(@RequestBody SupplierModel supplierModel) {
        try {
            return supplierService.updateSetModel(supplierModel);
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public @Valid String deleteSupplier(@RequestBody String phoneNumber) {
        try {
            return supplierService.deleteSupplierAccount(phoneNumber);
        } catch (Exception e) {
            return null;
        }
    }
}
