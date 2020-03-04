
function salesSupplierTableHtml() {
  return '<div class="tableContainer">' +
      '<div class="form-group pull-right searchInput">' +
      '<input type="text" class="search form-control" placeholder="Tedarikçi'
      + ' Hesabı Ara"/>' +
      '</div>' +

      '<span class="counter pull-right"></span>' +

      '<div class="tableFixHead scrollTable">' +
      '<table class="table table-hover table-bordered results">' +
      '<thead>' +

      '<tr class="tablesHead">' +
      '<th>Telefon Numarası</th>' +
      '<th>İsim</th>' +
      '<th>Soyisim</th>' +
      '<th>Firma Adı</th>' +
      '<th>İlçe</th>' +
      '<th>Satışa Başla</th>' +

      '</tr>' +

      '</thead>' +

      '<tbody id="selectSupplierTable" class="tablesBody">' +
      '</tbody>' +
      '</table>' +
      '</div>' +

      '</div>';
}

function selectSupplierForPurchasingBodyHtml(responseModel, current) {
  return '<tr>' +

      '<td id="phoneNumberForPurchase' + current + '">' +
      responseModel.phoneNumber +
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
      + 'onclick="startPurchase('
      + responseModel.phoneNumber + ');">' +
      '<span class="glyphicon glyphicon-shopping-cart"></span>' +
      '</button>' +
      '</td>' +

      +'</tr>';
}

function purchaseProductTable() {
  return '<div class="tableContainer">' +

      '<span class="counter pull-right"></span>' +
      '<div class="tableFixHeadForBasket scrollTable">' +

      '<table class="table table-hover table-bordered results">' +
      '<thead>' +

      '<tr class="tablesHead">' +
      '<th>Ürün Adı</th>' +
      '<th>Miktar</th>' +
      '<th>Birim</th>' +
      '<th>Birim Fiyat</th>' +
      '<th>Toplam Ödeme</th>' +
      '<th></th>' +

      '</tr>' +

      '</thead>' +

      '<tbody id="setPurchasingTable" class="tablesBody">' +

      '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>'+
  '<div class="purchasingInputContainer">' +

  '<div class="col-xs-4" style="margin-left: 67%;">' +
  '<button type="button" class="btn btn-info btn-md finishShoppingButton"'
  + ' onclick="addPurchasingRow();">Ekle</button>' +
  '</div>' +

  '</div>';
}
function addPurchasingRow() {
  $("#setPurchasingTable").append(addPurchasingHtml())
}

function addPurchasingHtml() {
  return '<tr id="salesPurchasingRowBody">' +

      '<td>' +
      '<input type="text"  id="productNamePurchasing"'
      + ' placeholder="Ürün Adı"'
      + ' autofocus>' +
      '</td>' +

      '<td>' +
      '<input type="number"  id="purchasingQuantity"'
      + ' placeholder="Alınan Miktar"'
      + ' autofocus>' +
      '</td>' +

      '<td id="unitTypePurchasing">' +
      '<div class="col-sm-9">' +
      '<select class="form-control productType" id="unitType">' +
      '<option value="Birim" selected>Birim</option>' +
      '</select>' +
      '</div>'+
      '</td>' +

      '<td>' +
      '<input type="number"  id="unitPrice"'
      + ' placeholder="Birim Fiyat"'
      + ' autofocus>' +
      '</td>' +

      '<td id="totalForProductPurchasing">Toplam' +
      // getMultiplicationOfTwoIdValue("#unitPrice" + currentSalesProduct,
      //   "#piece" + currentSalesProduct) +

      '</td>' +

      removeGlyphiconButtonHtml(1, "12345678910") +

      '</tr>';
}

function showSalesSupplierTable(url, id) {
  var allData = postModel(url, "");
  emptyContainer();
  $(".homePage").append(salesSupplierTableHtml());
  for (var i = 0; i < allData.length; i++) {
    $(id).append(
        selectSupplierForPurchasingBodyHtml(allData[i],
            currentCustomerAccountForSales));
    currentCustomerAccountForSales++;
  }
  searchActive();
}

function startPurchase(phoneNumber) {
  emptyContainer();
  $(".homePage").append(purchaseProductTable(phoneNumber,currentBasketId));
  for (var i = 0; i < allData.length; i++) {
    $("#selectProductTable").append(
        selectProductFromTableBody(allData[i], currentSalesProduct,phoneNumber));
    currentSalesProduct++;
  }
  searchActive();
}