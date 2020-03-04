package com.springJpa.demo.service;

import com.springJpa.demo.model.CustomerModel;
import com.springJpa.demo.model.ResponseModel;
import com.springJpa.demo.repository.CustomerRepository;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    private static final DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
    private CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public CustomerModel updateSetModel(CustomerModel customerModel) {
        CustomerModel customer = customerRepository.findById(customerModel.getId()).get();
        customer.setName(customerModel.getName());
        customer.setSurname(customerModel.getSurname());
        customer.setPhoneNumber(customerModel.getPhoneNumber());
        customer.setCompanyName(customerModel.getCompanyName());
        customer.setTcNo(customerModel.getTcNo());
        customer.setCity(customerModel.getCity());
        customer.setTown(customerModel.getTown());
        customer.setDistrict(customerModel.getDistrict());
        customer.setAddress(customerModel.getAddress());
        return customerRepository.save(customer);
    }

    public ResponseModel controlDublicateCustomer(CustomerModel customerModel) {
        for (CustomerModel model : getAllCustomerData()) {
            if (model.getTcNo().equals(customerModel.getTcNo())) {
                return ResponseModel.createResponseWithData(null, "Kayıt Zaten Mevcut!",1000);
            }
        }
        return ResponseModel.createResponseWithData(createNewCustomer(customerModel), "Kayıt tamamlandı.",200);
    }

    private CustomerModel createNewCustomer(CustomerModel customerModel) {
        Date date = new Date();
        customerModel.setCreateDate(dateFormat.format(date));
        return customerRepository.save(customerModel);
    }

    public List<CustomerModel> getAllCustomerData() {
        return customerRepository.findAll();
    }

    public String deleteCustomerAccount(String tcNo) {
        customerRepository.deleteById(findOneModelByTcNo(tcNo).get(0).getId());
        return tcNo;
    }

    private List<CustomerModel> findOneModelByTcNo(String tcNo) {
        List<CustomerModel> customersList = new ArrayList<>();
        getAllCustomerData().stream().filter(customer -> customer.getTcNo().equals(tcNo))
            .forEach(customersList::add);
        return customersList;
    }
}
