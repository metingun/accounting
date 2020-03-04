package com.springJpa.demo.service;

import com.springJpa.demo.model.ResponseModel;
import com.springJpa.demo.model.SupplierModel;
import com.springJpa.demo.repository.SupplierRepository;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class SupplierService {

    private static final DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
    private SupplierRepository supplierRepository;

    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public SupplierModel updateSetModel(SupplierModel supplierModel) {
        SupplierModel supplier = supplierRepository.findById(supplierModel.getId()).get();
        supplier.setName(supplierModel.getName());
        supplier.setSurname(supplierModel.getSurname());
        supplier.setPhoneNumber(supplierModel.getPhoneNumber());
        supplier.setCompanyName(supplierModel.getCompanyName());
        supplier.setCity(supplierModel.getCity());
        supplier.setTown(supplierModel.getTown());
        supplier.setDistrict(supplierModel.getDistrict());
        supplier.setAddress(supplierModel.getAddress());
        return supplierRepository.save(supplier);
    }

    public ResponseModel controlDublicateSupplier(SupplierModel supplierModel) {
        for (SupplierModel model : getAllSupplierData()) {
            if (model.getPhoneNumber().equals(supplierModel.getPhoneNumber())) {
                return ResponseModel.createResponseWithData(null, "Kayıt Zaten Mevcut!",1000);
            }
        }
        return ResponseModel.createResponseWithData(createNewSupplier(supplierModel), "Kayıt tamamlandı.",200);
    }

    private SupplierModel createNewSupplier(SupplierModel supplierModel) {
        Date date = new Date();
        supplierModel.setCreateDate(dateFormat.format(date));
        return supplierRepository.save(supplierModel);
    }

    public List<SupplierModel> getAllSupplierData() {
        return supplierRepository.findAll();
    }

    public String deleteSupplierAccount(String phoneNumber) {
        supplierRepository.deleteById(findOneModelByTcNo(phoneNumber).get(0).getId());
        return phoneNumber;
    }

    private List<SupplierModel> findOneModelByTcNo(String phoneNumber) {
        List<SupplierModel> suppliersList = new ArrayList<>();
        getAllSupplierData().stream().filter(supplier -> supplier.getPhoneNumber().equals(phoneNumber))
            .forEach(suppliersList::add);
        return suppliersList;
    }
}
