package com.springJpa.demo.service;

import com.springJpa.demo.model.ResponseModel;
import com.springJpa.demo.model.StockCardModel;
import com.springJpa.demo.repository.ProductRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class StockCardService {

    private ProductRepository productRepository;

    public StockCardService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public StockCardModel updateSetModel(StockCardModel stockCardModel) {
        StockCardModel product = productRepository.findById(stockCardModel.getId()).get();
        product.setProductName(stockCardModel.getProductName());
        product.setProductType(stockCardModel.getProductType());
        product.setBarcode(stockCardModel.getBarcode());
        product.setTradeMark(stockCardModel.getTradeMark());
        return productRepository.save(product);
    }

    public ResponseModel controlDublicateProduct(StockCardModel stockCardModel) {
        for (StockCardModel model : getAllProductData()) {
            if (model.getBarcode().equals(stockCardModel.getBarcode()) || (
                model.getProductName().equals(stockCardModel.getProductName()) && model
                    .getTradeMark().equals(stockCardModel.getTradeMark()))) {
                return ResponseModel.createResponseWithData(null, "Kayıt Zaten Mevcut!",1000);
            }
        }
        return ResponseModel.createResponseWithData(createNewProduct(stockCardModel), "Kayıt tamamlandı.", 200);
    }

    private StockCardModel createNewProduct(StockCardModel stockCardModel) {
        return productRepository.save(stockCardModel);
    }

    public List<StockCardModel> getAllProductData() {
        return productRepository.findAll();
    }

    public String deleteCustomerAccount(String barcode) {
        productRepository.deleteById(findOneModelByTcNo(barcode).get(0).getId());
        return barcode;
    }

    private List<StockCardModel> findOneModelByTcNo(String barcode) {
        List<StockCardModel> productList = new ArrayList<>();
        getAllProductData().stream().filter(customer -> customer.getBarcode().equals(barcode))
            .forEach(productList::add);
        return productList;
    }
}
