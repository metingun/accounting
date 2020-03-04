package com.springJpa.demo.controller;

import com.springJpa.demo.model.ProductTypeModel;
import com.springJpa.demo.model.ResponseModel;
import com.springJpa.demo.service.ProductTypeService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/restful/productTypes")
public class ProductTypeController {

    private final
    ProductTypeService productTypeService;

    public ProductTypeController(ProductTypeService productTypeService) {
        this.productTypeService = productTypeService;
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.POST)
    public List<ProductTypeModel> getAllProductTypes() {
        try {
            return productTypeService.getAllProductTypeData();
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @Valid ResponseModel createProductType(@Valid @RequestBody ProductTypeModel productTypeModel) {
        try {
            return productTypeService.controlDublicateProductType(productTypeModel);
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @Valid ProductTypeModel updateProductType(@RequestBody ProductTypeModel productTypeModel) {
        try {
            return productTypeService.updateSetModel(productTypeModel);
        } catch (Exception e) {
            return null;
        }
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public @Valid String deleteProductType(@RequestBody String productTypeName) {
        try {
            return productTypeService.deleteProductType(productTypeName);
        } catch (Exception e) {
            return null;
        }
    }
}
