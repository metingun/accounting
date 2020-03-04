var currentProductNumber = 1;

function addProductHtml(title) {
  return '<div class="container addFormProduct">' +
      '<form class="form-horizontal addProduct" role="form">' +
      '<h2>' + title + '</h2>' +

      '<div class="form-group">' +
      '<label for="tradeMark" class="col-sm-3 control-label">Marka:</label>' +
      '<div class="col-sm-9">' +
      '<input type="text" id="tradeMark" placeholder="Marka" class="form-control" autofocus>'
      +
      '</div>' +
      '</div>' +

      '<div class="form-group">' +
      '<label for="productName" class="col-sm-3'
      + ' control-label">Ürün Adı:<b style="color: red; font-size: medium">*</b></label>'
      +
      '<div class="col-sm-9">' +
      '<input type="tel" id="productName" placeholder="Ürün Adı"'
      + ' class="form-control">' +
      '</div>' +
      '</div>' +

      '<div class="form-group"><label for="barcode" class="col-sm-3'
      + ' control-label">Barkod:</label>'
      +
      '<div class="col-sm-9"><input type="text" id="barcode" placeholder="Barkod" class="form-control">'
      +
      '</div></div>' +

      '<div class="form-group"><label for="productType" class="col-sm-3'
      + ' control-label">Ürün Türü:<b style="color: red; font-size: medium">*</b></label>'
      +
      '<div class="col-sm-9">' +
      '<select class="form-control productType" id="productType">' +
      '<option value="Ürün Türü Seçiniz" selected>Ürün Türü Seçiniz</option>' +
      '</select>' +
      '</div></div>' +

      '<div class="form-group"><div class="col-sm-9 col-sm-offset-3">' +
      '<button type="button" class="btn btn-primary btn-block" id="saveButtonProduct" style="font-size:large" '
      +
      'onclick="addProduct();">Kaydet</button>' +
      '</div>' +
      '</div>' +

      '</form>' +
      '</div>';
}

function tableBodyProduct(responseModel, currentProductNumber) {
  return '<tr id="productTableRow' + currentProductNumber + '">' +
      '<td>' +
      responseModel.tradeMark +
      '</td>' +
      '<td>' +
      responseModel.productName +
      '</td>' +
      '<td>' +
      responseModel.productType +
      '</td>' +
      '<td id="barcode' + currentProductNumber + '">' +
      responseModel.barcode +
      '</td>' +

      '<td class="buttonsTable">' +
      '<button type="button" class="btn btn-info btn-sm" title="Düzenle">' +
      '<span class="glyphicon glyphicon-edit"></span> ' +
      '</button>' +
      '<button type="button" class="btn btn-info btn-sm deleteRowButton"'
      + ' onclick="deleteProductAccount(' + currentProductNumber + ');"'
      + ' title="Sil">' +
      '<span class="glyphicon glyphicon-trash"></span>' +
      '</button>' +
      '</td>' +

      '</tr>';
}

function productsTable() {
  return '<div class="tableContainer">' +
      '<div class="form-group pull-right searchInput">' +
      '<input type="text" class="search form-control" placeholder="Aranacak'
      + ' Kelime"/>' +
      '</div>' +

      '<span class="counter pull-right"></span>' +

      '<table class="table table-hover table-bordered results">' +

      '<thead>' +

      '<tr class="tablesHead">' +
      '<th>Marka</th>' +
      '<th>Ürün Adı</th>' +
      '<th>Ürün Türü</th>' +
      '<th>Barkod</th>' +
      '</tr>' +

      '<tr class="warning no-result">' +
      '<td colspan="4"><i class="fa fa-warning"></i>Sonuç Bulunamadı.</td>' +
      '</tr>' +

      '</thead>' +
      '<tbody id="productsTable" class="tablesBody">' +
      '</tbody>' +
      '</table>' +
      '</div>';
}

function addProduct() {
  if (checkAddProductForm()) {
    var createProduct = postModel("/restful/products/create",
        JSON.stringify(getProductModel()));
    alert(createProduct.message);
    if (createProduct.code === 200) {
      openAddProductPage();
    }
  }
  incorrectInput = [];
}

function showProducts() {
  var allData = postModel("http://localhost:8080/restful/products/getAll", "");
  emptyContainer();
  $(".homePage").append(productsTable());
  for (var i = 0; i < allData.length; i++) {
    $("#productsTable").append(
        tableBodyProduct(allData[i], currentProductNumber));
    currentProductNumber++;
  }
  searchActive();
}

function openAddProductPage() {
  emptyContainer();
  $(".homePage").append(addProductHtml("Stok Kartı"));
  addProductTypesToCombobox();
}

function getProductModel() {
  return {
    "tradeMark": getValueByElementId("tradeMark"),
    "productName": getValueByElementId("productName"),
    "productType": getValueByElementId("productType"),
    "barcode": getValueByElementId("barcode")
  };
}

function addProductTypesToCombobox() {
  var productTypeList = postModel("/restful/productTypes/getAll", "");
  for (var i = 0; i < productTypeList.length; i++) {
    var optionHtml = '<option value="' + productTypeList[i].productTypeName
        + '">' + productTypeList[i].productTypeName + '</option>';
    $(".productType").append(optionHtml);
  }
}

function deleteProductAccount(current) {
  postModel("http://localhost:8080/restful/products/delete",
      getTextByElementId("barcode" + current));
  $('#productTableRow' + current).remove();
}

// --------- CHECK FORM PROCESS FUNCTIONS ---------------
function checkAddProductForm() {
  var productNameValidation = validProductName("productName");
  var productTypeValidation = validProductType("productType");
  if (productNameValidation && productTypeValidation) {
    return true;
  } else {
    alert("Şu bölümler hatalı:" + writeErrorsToAlert());
  }
}