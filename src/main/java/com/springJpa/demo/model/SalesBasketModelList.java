package com.springJpa.demo.model;

import java.util.List;

public class SalesBasketModelList {
    private List<SalesModel> basketModelList;

    public List<SalesModel> getBasketModelList() {
        return basketModelList;
    }

    public void setBasketModelList(List<SalesModel> basketModelList) {
        this.basketModelList = basketModelList;
    }
}
