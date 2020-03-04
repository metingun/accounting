package com.springJpa.demo.controller;

import com.springJpa.demo.model.CustomerModel;
import com.springJpa.demo.model.ResponseModel;
import com.springJpa.demo.service.CustomerService;
import com.springJpa.demo.utils.CustomersSuppliersUtilService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/restful/customers")
public class CustomerController extends CustomersSuppliersUtilService {

    private final
    CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.POST)
    public List<CustomerModel> getAllCustomers() {
        try {
            return customerService.getAllCustomerData();
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @Valid ResponseModel createCustomer(@Valid @RequestBody CustomerModel customerModel) {
        try {
            return customerService.controlDublicateCustomer(customerModel);
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @Valid CustomerModel updateCustomer(@RequestBody CustomerModel customerModel) {
        try {
            return customerService.updateSetModel(customerModel);
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public @Valid String deleteCustomer(@RequestBody String tcNo) {
        try {
            return customerService.deleteCustomerAccount(tcNo);
        } catch (Exception e) {
            return null;
        }
    }
}
