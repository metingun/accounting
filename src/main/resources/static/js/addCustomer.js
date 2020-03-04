var currentCustomerNumber = 1;
var incorrectInput = [];

// ------- HTML FUNCTIONS ---------------
function customerRegistrationHtml(title) {
  return '<div class="container addFormCustomer">' +
      '<form class="form-horizontal addCustomer" role="form">' +
      '<h2>' + title + '</h2>' +

      '<div class="form-group">' +
      '<label for="tcNoCustomer"' +
      ' class="col-sm-3 control-label">TC Kimlik No:<b style="color: red; font-size: medium">*</b>'
      + ' </label>' +
      '<div class="col-sm-3">' +
      '<input type="text" id="tcNoCustomer"' +
      ' placeholder="TC Kimlik No" class="form-control" autofocus>' +
      '</div>' +
      '<label for="phoneNumberCustomer"'
      + ' class="col-sm-3 control-label">Telefon No:<b style="color: red; font-size: medium">*</b> </label>'
      +
      '<div class="col-sm-3">' +
      '<input type="tel" id="phoneNumberCustomer"'
      + ' placeholder="Telefon Numarası" class="form-control">' +
      '</div>' +
      '</div>' +

      '<div class="form-group">' +
      '<label for="nameCustomer"'
      + ' class="col-sm-3 control-label">İsim:<b style="color: red; font-size: medium">*</b> </label>'
      +
      '<div class="col-sm-9">' +
      '<input type="text" id="nameCustomer"'
      + ' placeholder="İsim" class="form-control" autofocus>' +
      '</div>' +
      '</div>' +

      '<div class="form-group">' +
      '<label for="surnameCustomer"'
      + ' class="col-sm-3 control-label">Soyisim:<b style="color: red; font-size: medium">*</b> </label>'
      +
      '<div class="col-sm-9">' +
      '<input type="text" id="surnameCustomer"'
      + ' placeholder="Soyisim" class="form-control" autofocus>' +
      '</div>' +
      '</div>' +

      '<div class="form-group">' +
      '<label for="companyNameCustomer"'
      + ' class="col-sm-3 control-label">Firma Adı: </label>' +
      '<div class="col-sm-9">' +
      '<input type="text" id="companyNameCustomer"'
      + ' placeholder="Firma Adı" class="form-control"></div>' +
      '</div>' +

      '<div class="form-group">' +
      '<label for="cityCustomer"'
      + ' class="col-sm-3 control-label">Şehir: </label>' +
      '<div class="col-sm-9">' +
      '<input type="text" id="cityCustomer"'
      + ' placeholder="Şehir" class="form-control">' +
      '</div>' +
      '</div>' +

      '<div class="form-group"><label for="townCustomer" class="col-sm-3'
      + ' control-label">İlçe: </label>' +
      '<div class="col-sm-9"><input type="text" id="townCustomer"'
      + ' placeholder="İlçe" class="form-control">' +
      '</div>' +
      '</div>' +

      '<div class="form-group"><label for="districtCustomer"'
      + ' class="col-sm-3 control-label">Mahalle/Sokak: </label>' +
      '<div class="col-sm-9">' +
      '<input type="text" id="districtCustomer"'
      + ' placeholder="Mahalle/Sokak" class="form-control">' +
      '</div></div>' +

      '<div class="form-group"><label for="addressCustomer" class="col-sm-3'
      + ' control-label">Adres Detayı: </label>' +
      '<div class="col-sm-9">' +
      '<input type="text" id="addressCustomer"'
      + ' placeholder="Adres Detayı" class="form-control">' +
      '</div>' +
      '</div>' +

      '<div class="form-group"><div class="col-sm-9 col-sm-offset-3">' +
      '<button type="button" class="btn btn-primary btn-block" id="saveButtonCustomer"'
      + ' style="font-size:large" onclick="addCustomerAccount();">Kaydet</button>'
      +
      '</div>' +
      '</div>' +

      '</form>' +
      '</div>';
}

function customerTableBody(responseModel, current) {
  return '<tr id="customerTableRow' + currentCustomerNumber + '">' +

      '<td id="tcNoCustomer' + current + '">' +
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
      '<button type="button" class="btn btn-info btn-sm deleteRowButton"' +
      ' onclick="deleteCustomerAccount(' + currentCustomerNumber + ');" '
      + 'title="Sil">' +
      '<span class="glyphicon glyphicon-trash"></span>' +
      '</button>' +
      '</td>' +

      +'</tr>';
}

function customerAccountsTable() {
  return '<div class="tableContainer">' +
      '<div class="form-group pull-right searchInput">' +
      '<input type="text" class="search form-control" placeholder="Aranacak'
      + ' Kelime"/>' +
      '</div>' +

      '<span class="counter pull-right"></span>' +

      '<table class="table table-hover table-bordered results">' +
      '<thead>' +

      '<tr class="tablesHead">' +
      '<th>TC Kimlik No</th>' +
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

      '<tbody id="accountsTableCustomer" class="tablesBody">' +
      '</tbody>' +
      '</table>' +
      '</div>';
}

// ------- CREATE CUSTOMER ACCOUNT FUNCTIONS ---------------
function openAddCustomerPage() {
  emptyContainer();
  $(".homePage").append(customerRegistrationHtml("Müşteri Hesabı"));
}

function addCustomerAccount() {
  if (checkAddCustomerForm()) {
    var createCustomer = postModel(
        "http://localhost:8080/restful/customers/create",
        JSON.stringify(getCustomerAccountModel()));
    alert(createCustomer.message);
    if (createCustomer.code === 200) {
      openAddCustomerPage();
    }
  }
  incorrectInput = [];
}

function getCustomerAccountModel() {
  return {
    "tcNo": getValueByElementId("tcNoCustomer"),
    "name": getValueByElementId("nameCustomer"),
    "surname": getValueByElementId("surnameCustomer"),
    "phoneNumber": getValueByElementId("phoneNumberCustomer"),
    "companyName": getValueByElementId("companyNameCustomer"),
    "city": getValueByElementId("cityCustomer"),
    "town": getValueByElementId("townCustomer"),
    "district": getValueByElementId("districtCustomer"),
    "address": getValueByElementId("addressCustomer")
  };
}

// ------- SHOW CUSTOMER ACCOUNTS TABLES FUNCTIONS ---------------
function showCustomerTable(url, id) {
  var allData = postModel(url, "");
  emptyContainer();
  $(".homePage").append(customerAccountsTable());
  for (var i = 0; i < allData.length; i++) {
    $(id).append(customerTableBody(allData[i], currentCustomerNumber));
    currentCustomerNumber++;
  }
  searchActive();
}

// ------- DELETE CUSTOMER ACCOUNT FUNCTIONS ---------------
function deleteCustomerAccount(current) {
  postModel("http://localhost:8080/restful/customers/delete",
      getTextByElementId("tcNoCustomer" + current));
  $('#customerTableRow' + current).remove();
}

// --------- CHECK FORM PROCESS FUNCTIONS ---------------
function checkAddCustomerForm() {
  var nameValidation = validName("nameCustomer");
  var phoneNumberValidation = validPhoneNumber("phoneNumberCustomer");
  var surnameValidation = validSurname("surnameCustomer");
  var tcNoValidation = validTcNo("tcNoCustomer");
  if (nameValidation && phoneNumberValidation && surnameValidation
      && tcNoValidation) {
    return true;
  } else {
    alert("Şu bölümler hatalı:" + writeErrorsToAlert());
  }
}