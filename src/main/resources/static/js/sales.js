var currentSalesProduct = 1;
var currentCustomerAccountForSales = 1;
var currentBasketId = 1;
var salesBasketModelList = [];

/*function selectCustomerAccount(title) {
  return '<div class="container addFormProductType">' +
      '<form class="form-horizontal addProductType" role="form">' +
      '<h2>' + title + '</h2>' +

      '<div class="form-group">' +
      '<label for="productTypeName" class="col-sm-3 control-label">Ürün Türü</label>'
      +
      '<div class="col-sm-9">' +
      '<input type="text" id="productTypeName" placeholder="Ürün Türü" class="form-control" autofocus>'
      +
      '</div>' +
      '</div>' +

      '<div class="form-group"><div class="col-sm-9 col-sm-offset-3">' +
      '<button type="button" class="btn btn-primary btn-block" ' +
      'id="saveButtonProductType" style="font-size:large"'
      + ' onclick="startSales();">Satışa Başla</button>' +
      '</div>' +
      '</div>' +

      '</form>' +
      '</div>';
}*/

//  --------------  ABOUT SHOPPING PAGE FUNCTIONS -------------------

function selectProductFromTableBody(responseModel, currentSalesProduct,tcNo) {
  return '<tr id="salesProductRowBody' + currentSalesProduct + '">' +

      '<td id="tradeMark' + currentSalesProduct + '">' +
      responseModel.tradeMark +
      '</td>' +

      '<td id="productName' + currentSalesProduct + '">' +
      responseModel.productName +
      '</td>' +

      '<td id="barcode' + currentSalesProduct + '">' +
      responseModel.barcode +
      '</td>' +

      '<td>' +
      '<input type="number"  id="unitPrice' + currentSalesProduct
      + '" placeholder="Birim Fiyat"'
      + ' autofocus>' +
      '</td>' +

      '<td>' +
      '<input type="number"  id="piece' + currentSalesProduct
      + '" placeholder="Satılan Adet"'
      + ' autofocus>' +
      '</td>' +

      '<td id="totalForProduct' + currentSalesProduct + '">Toplam' +
      // getMultiplicationOfTwoIdValue("#unitPrice" + currentSalesProduct,
      //   "#piece" + currentSalesProduct) +

      '</td>' +

      addGlyphiconButtonHtml(currentSalesProduct, tcNo) +

      '</tr>';
}

function addToBasket(currentSalesProduct, tcNo) {
  $("#salesProductRowBody" + currentSalesProduct).appendTo(
      "#currentBasketTable");
  $("#selectCustomerTable #salesProductRowBody" + currentSalesProduct).remove();
  $("#addToBasketButton" + currentSalesProduct).remove();
  $("#salesProductRowBody" + currentSalesProduct).append(
      removeGlyphiconButtonHtml(currentSalesProduct));
  salesBasketModelList.push(modelAddProductButton(currentSalesProduct, tcNo))
}

function modelAddProductButton(currentSalesProduct, tcNo) {
  return {
    "salesBasketId": currentBasketId,
    "tcNo": tcNo.toString(),
    "tradeMark": getTextByElementId("tradeMark" + currentSalesProduct),
    "productName": getTextByElementId("productName" + currentSalesProduct),
    "barcode": getTextByElementId("barcode" + currentSalesProduct),
    "unitPrice": getValueByElementId("unitPrice" + currentSalesProduct),
    "piece": getValueByElementId("piece" + currentSalesProduct),
    "totalPrice": 150 //getTextByElementId("totalForProduct" +
    // currentSalesProduct)
  };
}
function removeModelFromArray(currentSalesProduct) {
  for (var i=0;i<salesBasketModelList.length;i++){
    if (salesBasketModelList[i].barcode===getTextByElementId("barcode"+currentSalesProduct)){
      salesBasketModelList.splice(i,1);
    }
  }
}
function removeFromBasket(currentSalesProduct) {
  $("#salesProductRowBody" + currentSalesProduct).appendTo(
      "#selectProductTable");
  $("#currentBasketTable #salesProductRowBody" + currentSalesProduct).remove();
  $("#removeFromBasketButton" + currentSalesProduct).remove();
  $("#salesProductRowBody" + currentSalesProduct).append(
      addGlyphiconButtonHtml(currentSalesProduct));
  removeModelFromArray(currentSalesProduct);
}

function addGlyphiconButtonHtml(currentSalesProduct, tcNo) {
  return '<td class="buttonsTable" id="addToBasketButton' + currentSalesProduct
      + '">' +
      '<button type="button"'
      + ' class="btn'
      + ' btn-info btn-sm" title="Sepete'
      + ' Ekle" onclick="addToBasket(' + currentSalesProduct + ',' + tcNo
      + ');">' +
      '<span class="glyphicon glyphicon-plus"></span>' +
      '</button>' +
      '</td>';
}

function removeGlyphiconButtonHtml(currentSalesProduct) {
  return '<td class="buttonsTable" id="removeFromBasketButton'
      + currentSalesProduct + '">' +
      '<button type="button"'
      + ' class="btn'
      + ' btn-danger btn-sm" title="Sepetten'
      + ' Çıkar" onclick="removeFromBasket(' + currentSalesProduct + ');">' +
      '<span class="glyphicon glyphicon-remove"></span>' +
      '</button>' +
      '</td>';
}

function finishShopping(tcNo,basketId) {
  var salesBasketListModel = JSON.stringify({"basketModelList": salesBasketModelList });
  postModel("http://localhost:8080/restful/sales/create",
      salesBasketListModel);
  postModel("http://localhost:8080/restful/salesBasket/create",
      JSON.stringify(salesPostModelJson(tcNo,basketId)));
  currentBasketId++;
  salesBasketModelList=[];
  emptyContainer();
}

function salesProductTable(tcNo,currentBasketId) {

  // Ürün Ekleme Container
  return '<div class="tableContainer">' +
      '<div class="form-group pull-right searchInput">' +
      '<input type="text" class="search form-control" placeholder="Ürün'
      + ' Ara"/>' +
      '</div>' +

      '<span class="counter pull-right"></span>' +
      '<div class="tableFixHeadForBasket scrollTable">' +

      '<table class="table table-hover table-bordered results">' +
      '<thead>' +

      '<tr class="tablesHead">' +
      '<th>Marka</th>' +
      '<th>Ürün Adı</th>' +
      '<th>Barkod</th>' +
      '<th>Birim Fiyat</th>' +
      '<th>Satılan Adet</th>' +
      '<th>Toplam</th>' +
      '<th>Ekle</th>' +

      '</tr>' +

      '</thead>' +

      '<tbody id="selectProductTable" class="tablesBody">' +
      '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +

      basketContainerHtml() +

      paymentEntryContainerHtml(currentBasketId) +

      finishShoppingContainerHtml(tcNo,currentBasketId);
}

function basketContainerHtml() {

  // Sepet Container
  return '<div class="basketContainer">' +
      '<div class="tableFixHeadForBasket scrollTable">' +

      '<table class="table table-hover table-bordered">' +
      '<thead>' +

      '<tr class="tablesHead">' +
      '<th>Marka</th>' +
      '<th>Ürün Adı</th>' +
      '<th>Barkod</th>' +
      '<th>Birim Fiyat</th>' +
      '<th>Satılan Adet</th>' +
      '<th>Toplam</th>' +
      '<th>Çıkar</th>' +

      '</tr>' +
      '</thead>' +
      '<tbody id="currentBasketTable" class="tablesBody">' +

      '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>';
}

function paymentEntryContainerHtml(currentBasketId) {

  // Ödeme Giriş Container
  return '<div class="salesInputContainer">' +

      '<div class="col-xs-4">' +
      '<input type="number" id="receivedPayment'+currentBasketId+'" class="form-control"'
      + ' placeholder="Alınan'
      + ' Ödeme"'
      + ' autofocus>' +
      '</div>' +

      '<div class="col-xs-4">' +
      '<input type="number" id="discountedPayment'+currentBasketId+'" class="form-control" placeholder="Ödenecek Tutar"'
      + ' autofocus>' +
      '</div>' +

      '<div class="col-xs-4">' +
      '<strong style="font-size: x-large; float: right;">Mevcut Toplam:'
      + ' <b id="totalPrice'+currentBasketId+'">1200</b>'
      + ' TL' +
      '</strong>' +
      '</div>' +

      '</div>';
}

function finishShoppingContainerHtml(tcNo,currentBasketId) {

  // Satış Tamamlandı Butonu
  return '<div class="salesInputContainer">' +

      '<div class="col-xs-4" style="margin-left: 67%;">' +
      '<button type="button" class="btn btn-info btn-md finishShoppingButton"'
      + ' onclick="finishShopping('+tcNo+','+currentBasketId+');">Siparişi Tamamla</button>' +
      '</div>' +

      '</div>';
}

function salesPostModelJson(tcNo,currentBasketId) {
  return {
    "salesBasketId": currentBasketId,
    "tcNo": tcNo.toString(),
    "totalPrice": getTextByElementId("totalPrice"+currentBasketId),
    "receivedPayment": getValueByElementId("receivedPayment"+currentBasketId),
    "discountedPayment": getValueByElementId("discountedPayment"+currentBasketId)
  };
}

//  -----  ABOUT SELECT CUSTOMER ACCOUNT PAGE FOR SHOPPING FUNCTIONS ---------

function salesCustomerTableHtml() {
  return '<div class="tableContainer">' +
      '<div class="form-group pull-right searchInput">' +
      '<input type="text" class="search form-control" placeholder="Müşteri'
      + ' Hesabı Ara"/>' +
      '</div>' +

      '<span class="counter pull-right"></span>' +

      '<div class="tableFixHead scrollTable">' +
      '<table class="table table-hover table-bordered results">' +
      '<thead>' +

      '<tr class="tablesHead">' +
      '<th>TC Kimlik No</th>' +
      '<th>İsim</th>' +
      '<th>Soyisim</th>' +
      '<th>Firma Adı</th>' +
      '<th>İlçe</th>' +
      '<th>Satışa Başla</th>' +

      '</tr>' +

      '</thead>' +

      '<tbody id="selectCustomerTable" class="tablesBody">' +
      '</tbody>' +
      '</table>' +
      '</div>' +

      '</div>';
}

function selectCustomerForSalesBodyHtml(responseModel, current) {
  return '<tr>' +

      '<td id="tcNoForSales' + current + '">' +
      responseModel.tcNo +
      '</td>' +

      '<td>' +
      responseModel.name +
      '</td>' +

      '<td>' +
      responseModel.surname +
      '</td>' +

      '<td>' +
      responseModel.companyName +
      '</td>' +

      '<td>' +
      responseModel.town +
      '</td>' +

      '<td class="buttonsTable">' +
      '<button type="button" class="btn btn-info btn-sm" title="Başla" '
      + 'onclick="startSales('
      + responseModel.tcNo + ');">' +
      '<span class="glyphicon glyphicon-shopping-cart"></span>' +
      '</button>' +
      '</td>' +

      +'</tr>';
}

function showSalesCustomerTable(url, id) {
  var allData = postModel(url, "");
  emptyContainer();
  $(".homePage").append(salesCustomerTableHtml());
  for (var i = 0; i < allData.length; i++) {
    $(id).append(
        selectCustomerForSalesBodyHtml(allData[i],
            currentCustomerAccountForSales));
    currentCustomerAccountForSales++;
  }
  searchActive();
}

function startSales(tcNo) {
  emptyContainer();
  var allData = postModel("http://localhost:8080/restful/products/getAll", "");
  $(".homePage").append(salesProductTable(tcNo,currentBasketId));
  for (var i = 0; i < allData.length; i++) {
    $("#selectProductTable").append(
        selectProductFromTableBody(allData[i], currentSalesProduct,tcNo));
    currentSalesProduct++;
  }
  searchActive();
}

