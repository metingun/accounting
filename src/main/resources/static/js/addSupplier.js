var currentSupplierNumber = 1;

// ------- HTML FUNCTIONS ---------------
function supplierRegistrationHtml(title) {
  return '<div class="container addFormSupplier">' +
      '<form class="form-horizontal addSupplier" role="form">' +
      '<h2>' + title + '</h2>' +

      '<div class="form-group">' +
      '<label for="nameSupplier"'
      + ' class="col-sm-3 control-label">İsim:<b style="color: red; font-size: medium">*</b> </label>'
      +
      '<div class="col-sm-9">' +
      '<input type="text" id="nameSupplier"'
      + ' placeholder="İsim" class="form-control" autofocus>' +
      '</div>' +
      '</div>' +

      '<div class="form-group">' +
      '<label for="surnameSupplier"'
      + ' class="col-sm-3 control-label">Soyisim:<b style="color: red; font-size: medium">*</b> </label>'
      +
      '<div class="col-sm-9">' +
      '<input type="text" id="surnameSupplier"'
      + ' placeholder="Soyisim" class="form-control" autofocus>' +
      '</div>' +
      '</div>' +

      '<div class="form-group">' +
      '<label for="companyNameSupplier"'
      + ' class="col-sm-3 control-label">Firma Adı: </label>' +
      '<div class="col-sm-9">' +
      '<input type="text" id="companyNameSupplier"'
      + ' placeholder="Firma Adı" class="form-control"></div>' +
      '</div>' +

      '<div class="form-group">' +
      '<label for="phoneNumberSupplier"'
      + ' class="col-sm-3 control-label">Telefon No:<b style="color: red; font-size: medium">*</b> </label>'
      +
      '<div class="col-sm-9">' +
      '<input type="text" id="phoneNumberSupplier"'
      + ' placeholder="Telefon No" class="form-control" autofocus>' +
      '</div>' +
      '</div>' +

      '<div class="form-group">' +
      '<label for="citySupplier"'
      + ' class="col-sm-3 control-label">Şehir: </label>' +
      '<div class="col-sm-9">' +
      '<input type="text" id="citySupplier"'
      + ' placeholder="Şehir" class="form-control">' +
      '</div>' +
      '</div>' +

      '<div class="form-group"><label for="townSupplier" class="col-sm-3'
      + ' control-label">İlçe: </label>' +
      '<div class="col-sm-9"><input type="text" id="townSupplier"'
      + ' placeholder="İlçe" class="form-control">' +
      '</div>' +
      '</div>' +

      '<div class="form-group"><label for="districtSupplier"'
      + ' class="col-sm-3 control-label">Mahalle/Sokak: </label>' +
      '<div class="col-sm-9">' +
      '<input type="text" id="districtSupplier"'
      + ' placeholder="Mahalle/Sokak" class="form-control">' +
      '</div></div>' +

      '<div class="form-group"><label for="addressSupplier" class="col-sm-3'
      + ' control-label">Adres Detayı: </label>' +
      '<div class="col-sm-9">' +
      '<input type="text" id="addressSupplier"'
      + ' placeholder="Adres Detayı" class="form-control">' +
      '</div>' +
      '</div>' +

      '<div class="form-group"><div class="col-sm-9 col-sm-offset-3">' +
      '<button type="button" class="btn btn-primary btn-block" id="saveButtonSupplier"'
      + ' style="font-size:large" onclick="addSupplierAccount();">Kaydet</button>'
      +
      '</div>' +
      '</div>' +

      '</form>' +
      '</div>';
}

function supplierTableBody(responseModel, currentSupplierNumber) {
  return '<tr id="supplierTableRow' + currentSupplierNumber + '">' +

      '<td>' +
      responseModel.name +
      '</td>' +

      '<td>' +
      responseModel.surname +
      '</td>' +

      '<td>' +
      responseModel.companyName +
      '</td>' +

      '<td id="phoneNumberSupplier' + currentSupplierNumber + '">' +
      responseModel.phoneNumber +
      '</td>' +

      '<td>' +
      responseModel.city +
      '</td>' +

      '<td>' +
      responseModel.town +
      '</td>' +

      '<td>' +
      responseModel.district +
      '</td>' +

      '<td>' +
      responseModel.address +
      '</td>' +

      '<td class="buttonsTable">' +
      '<button type="button" class="btn btn-info btn-sm" title="Düzenle">' +
      '<span class="glyphicon glyphicon-edit"></span> ' +
      '</button>' +
      '<button type="button" class="btn btn-info btn-sm deleteRowButton"'
      + ' onclick="deleteSupplierAccount(' + currentSupplierNumber
      + ');" title="Sil">' +
      '<span class="glyphicon glyphicon-trash"></span>' +
      '</button>' +
      '</td>' +

      +'</tr>';
}

function supplierAccountsTable() {
  return '<div class="tableContainer">' +
      '<div class="form-group pull-right searchInput">' +
      '<input type="text" class="search form-control" placeholder="Aranacak'
      + ' Kelime"/>' +
      '</div>' +

      '<span class="counter pull-right"></span>' +

      '<table class="table table-hover table-bordered results">' +
      '<thead>' +

      '<tr class="tablesHead">' +
      '<th>İsim</th>' +
      '<th>Soyisim</th>' +
      '<th>Firma Adı</th>' +
      '<th>Telefon Numarası</th>' +
      '<th>Şehir</th>' +
      '<th>İlçe</th>' +
      '<th>Mahalle/Sokak</th>' +
      '<th>Adres Detayı</th>' +
      '</tr>' +

      '<tr class="warning no-result">' +
      '<td colspan="4"><i class="fa fa-warning"></i>Sonuç Bulunamadı.</td>' +
      '</tr>' +

      '</thead>' +
      '<tbody id="accountsTableSupplier" class="tablesBody">' +
      '</tbody>' +
      '</table>' +
      '</div>';
}

// ------- CREATE SUPPLIER ACCOUNT FUNCTIONS ---------------

function openAddSupplierPage() {
  emptyContainer();
  $(".homePage").append(supplierRegistrationHtml("Tedarikçi Hesabı"));
}

function addSupplierAccount() {
  if (checkAddSupplierForm()) {
    var createSupplier = postModel(
        "http://localhost:8080/restful/suppliers/create",
        JSON.stringify(getSupplierAccountModel()));
    alert(createSupplier.message);
    if (createSupplier.code === 200) {
      openAddSupplierPage();
    }
  }
  incorrectInput = [];
}

function getSupplierAccountModel() {
  return {
    "name": getValueByElementId("nameSupplier"),
    "surname": getValueByElementId("surnameSupplier"),
    "phoneNumber": getValueByElementId("phoneNumberSupplier"),
    "companyName": getValueByElementId("companyNameSupplier"),
    "city": getValueByElementId("citySupplier"),
    "town": getValueByElementId("townSupplier"),
    "district": getValueByElementId("districtSupplier"),
    "address": getValueByElementId("addressSupplier")
  };
}

// ------- SHOW SUPPLIER ACCOUNTS TABLES FUNCTIONS ---------------
function showSupplierTable(url, id) {
  var allData = postModel(url, "");
  emptyContainer();
  $(".homePage").append(supplierAccountsTable());
  for (var i = 0; i < allData.length; i++) {
    $(id).append(supplierTableBody(allData[i], currentSupplierNumber));
    currentSupplierNumber++;
  }
  searchActive();
}

// ------- DELETE CUSTOMER ACCOUNT FUNCTIONS ---------------
function deleteSupplierAccount(current) {
  postModel("http://localhost:8080/restful/suppliers/delete",
      getTextByElementId("phoneNumberSupplier" + current));
  $('#supplierTableRow' + current).remove();
}

// --------- CHECK FORM PROCESS FUNCTIONS ---------------
function checkAddSupplierForm() {
  var nameValidation = validName("nameSupplier");
  var phoneNumberValidation = validPhoneNumber("phoneNumberSupplier");
  var surnameValidation = validSurname("surnameSupplier");
  if (nameValidation && phoneNumberValidation && surnameValidation) {
    return true;
  } else {
    alert("Şu bölümler hatalı:" + writeErrorsToAlert());
  }
}