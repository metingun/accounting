var currentProductTypeNumber = 1;

function addProductTypeHtml(title) {
  return '<div class="container addFormProductType">' +
      '<form class="form-horizontal addProductType" role="form">' +
      '<h2>' + title + '</h2>' +
      '<div class="form-group">' +
      '<label for="productTypeName" class="col-sm-3 control-label">Ürün'
      + ' Türü:<b style="color: red; font-size: medium">*</b></label>'
      +
      '<div class="col-sm-9">' +
      '<input type="text" id="productTypeName" placeholder="Ürün Türü" class="form-control" autofocus>'
      +
      '</div>' +
      '</div>' +
      '<div class="form-group"><div class="col-sm-9 col-sm-offset-3">' +
      '<button type="button" class="btn btn-primary btn-block" ' +
      'id="saveButtonProductType" style="font-size:large" onclick="addProductType();">Ekle</button>'
      +
      '</div>' +
      '</div>' +
      '<div class="form-group"><div class="col-sm-9 col-sm-offset-3">' +
      '<button type="button" class="btn btn-primary btn-block" ' +
      'id="showButtonProductType" style="font-size:large" onclick="showProductTypes();">Görüntüle</button>'
      +
      '</div>' +
      '</div>' +
      '</form>' +
      '</div>';
}

function tableBodyProductType(responseModel, currentProductTypeNumber) {
  return '<tr id="productTypeTableRow' + currentProductTypeNumber + '">'

      + '<td id="productTypeName' + currentProductTypeNumber + '">' +
      responseModel.productTypeName +
      '</td>' +

      '<td class="buttonsTable">' +
      '<button type="button" class="btn btn-info btn-sm" title="Düzenle">' +
      '<span class="glyphicon glyphicon-edit"></span> ' +
      '</button>' +
      '<button type="button" class="btn btn-info btn-sm deleteRowButton"'
      + ' onclick="deleteProductTypeAccount(' + currentProductTypeNumber + ');"'
      + ' title="Sil">' +
      '<span class="glyphicon glyphicon-trash"></span>' +
      '</button>' +
      '</td>' +

      +'</tr>';

}

function productTypesTable() {
  return '<div class="tableContainer">' +
      '<div class="form-group pull-right searchInput">' +
      '<input type="text" class="search form-control" placeholder="Aranacak'
      + ' Kelime"/>' +
      '</div>' +

      '<span class="counter pull-right"></span>' +

      '<table class="table table-hover table-bordered results">' +
      '<thead>' +

      '<tr class="tablesHead">' +
      '<th class="col-md-5 col-xs-5">Ürün Türü</th>' +
      '</tr>' +
      '<tr class="warning no-result">' +
      '<td colspan="4"><i class="fa fa-warning"></i>Sonuç Bulunamadı.</td>' +
      '</tr>' +

      '</thead>' +

      '<tbody id="productTypeTable" class="tablesBody">' +
      '</tbody>' +
      '</table>' +
      '</div>';
}

function showProductTypes() {
  var allData = postModel("http://localhost:8080/restful/productTypes/getAll",
      "");
  emptyContainer();
  $(".homePage").append(productTypesTable());
  for (var i = 0; i < allData.length; i++) {
    $("#productTypeTable").append(
        tableBodyProductType(allData[i], currentProductTypeNumber));
    currentProductTypeNumber++;
  }
  searchActive();
}

function addProductType() {
  if (checkAddProductTypeForm()) {
    var createProductType = postModel(
        "http://localhost:8080/restful/productTypes/create",
        JSON.stringify(getProductTypeModel()));
    alert(createProductType.message);
    if (createProductType.code === 200) {
      openAddProductTypePage();
    }
  }
  incorrectInput = [];
}

function getProductTypeModel() {
  return {
    "productTypeName": getValueByElementId("productTypeName")
  };
}

function openAddProductTypePage() {
  emptyContainer();
  $(".homePage").append(addProductTypeHtml("Ürün Türleri"));
}

function deleteProductTypeAccount(current) {
  postModel("http://localhost:8080/restful/productTypes/delete",
      getTextByElementId("productTypeName" + current));
  $('#productTypeTableRow' + current).remove();
}

// --------- CHECK FORM PROCESS FUNCTIONS ---------------
function checkAddProductTypeForm() {
  var productNameValidation=validProductName("productTypeName");
  if (productNameValidation) {
    return true;
  } else {
    alert("Ürün Türü Hatalı!");
  }
}