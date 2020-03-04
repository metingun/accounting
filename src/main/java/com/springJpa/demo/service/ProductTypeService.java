package com.springJpa.demo.service;

import com.springJpa.demo.model.ProductTypeModel;
import com.springJpa.demo.model.ResponseModel;
import com.springJpa.demo.repository.ProductTypeRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ProductTypeService {

    private final
    ProductTypeRepository productTypeRepository;

    public ProductTypeService(ProductTypeRepository productTypeRepository) {
        this.productTypeRepository = productTypeRepository;
    }

    public ProductTypeModel updateSetModel(ProductTypeModel productTypeModel) {
        ProductTypeModel productType = productTypeRepository.findById(productTypeModel.getId()).get();
        productType.setProductTypeName(productTypeModel.getProductTypeName());
        return productTypeRepository.save(productType);
    }

    public ResponseModel controlDublicateProductType(ProductTypeModel productTypeModel) {
        for (ProductTypeModel model : getAllProductTypeData()) {
            if (model.getProductTypeName().equals(productTypeModel.getProductTypeName())) {
                return ResponseModel.createResponseWithData(null, "Kayıt Zaten Mevcut!", 1000);
            }
        }
        return ResponseModel
            .createResponseWithData(createNewProductType(productTypeModel), "Kayıt tamamlandı.", 200);
    }

    private ProductTypeModel createNewProductType(ProductTypeModel productTypeModel) {
        return productTypeRepository.save(productTypeModel);
    }

    public List<ProductTypeModel> getAllProductTypeData() {
        return productTypeRepository.findAll();
    }

    public String deleteProductType(String productTypeName) {
        productTypeRepository.deleteById(findOneModelByTypeName(productTypeName).get(0).getId());
        return productTypeName;
    }

    private List<ProductTypeModel> findOneModelByTypeName(String productTypeName) {
        List<ProductTypeModel> productTypeList = new ArrayList<>();
        getAllProductTypeData().stream().filter(supplier -> supplier.getProductTypeName().equals(productTypeName))
            .forEach(productTypeList::add);
        return productTypeList;
    }

}
