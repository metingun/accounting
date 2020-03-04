function emptyContainer() {
  $(".homePage").empty();
}

function searchActive() {
  $(".search").keyup(function () {
    var searchTerm = $(".search").val();
    var searchSplit = searchTerm.replace(/ /g, "'):containsi('");

    $.extend($.expr[':'], {
      'containsi': function (elem, i, match) {
        return (elem.textContent || elem.innerText
            || '').toLowerCase().indexOf(
            (match[3] || "").toLowerCase()) >= 0;
      }
    });

    $(".results tbody tr").not(
        ":containsi('" + searchSplit + "')").each(function () {
      $(this).attr('visible', 'false');
    });

    $(".results tbody tr:containsi('" + searchSplit + "')").each(
        function () {
          $(this).attr('visible', 'true');
        });

    var jobCount = $('.results tbody tr[visible="true"]').length;
    $('.counter').text(jobCount + ' Sonuç');

    if (jobCount === '0') {
      $('.no-result').show();
    } else {
      $('.no-result').hide();
    }
  });
}

function postModel(url, requestData) {
  var responseModel = "";
  $.ajax({
    url: url,
    type: "POST",
    contentType: "application/json",
    crossDomain: true,
    dataType: "json",
    async: false,
    data: requestData,
    success: function (response) {
      responseModel = response;
    }
  });
  return responseModel;
}

function getValueByElementId(elementId) {
  return document.getElementById(elementId).value;
}

function getTextByElementId(elementId) {
  return document.getElementById(elementId).innerText;
}

function getMultiplicationOfTwoIdValue(firstId, secondId) {
  return getValueByElementId(firstId) * getValueByElementId(secondId);
}

// ------------------ FORM VALIDATION PROCESS FUNCTIONS --------------------

function writeErrorsToAlert() {
  var text = "";
  for (var i = 0; i < incorrectInput.length; i++) {
    text += "\n" + incorrectInput[i];
  }
  return text;
}

function validName(id) {
  var name = getValueByElementId(id);
  var regex = /^[a-zA-ZğĞüÜşŞıİöÖÇç ]+$/;
  var condition = (name.match(regex)) && (name.length < 30) && (name.length>0);
  if (!condition) {
    incorrectInput.push("İsim");
  }
  return condition;
}

function validSurname(id) {
  var surname = getValueByElementId(id);
  var regex = /^[a-zA-ZğĞüÜşŞıİöÖÇç ]+$/;
  var condition = (surname.match(regex)) && (surname.length < 30) && (surname.length>0);
  if (!condition) {
    incorrectInput.push("Soyisim");
  }
  return condition;
}

function validPhoneNumber(id) {
  var phoneNumber = getValueByElementId(id);
  var regex = /^[0-9 ]+$/;
  var condition = (phoneNumber.match(regex)) && (phoneNumber.length < 13) && (phoneNumber.length>8);
  if (!condition) {
    incorrectInput.push("Telefon No");
  }
  return condition;
}

function validTcNo(id) {
  var tcNo = getValueByElementId(id);
  var regex = /^[0-9 ]+$/;
  var condition = (tcNo.match(regex)) && (tcNo.length === 11);
  if (!condition) {
    incorrectInput.push("TC Kimlik No");
  }
  return condition;
}

function validProductName(id) {
  var productName = getValueByElementId(id);
  var regex = /^[a-zA-ZğĞüÜşŞıİöÖÇç ]+$/;
  var condition = (productName.match(regex)) && (productName.length < 50) && (productName.length>0);
  if (!condition) {
    incorrectInput.push("Ürün Adı");
  }
  return condition;
}

function validProductType(id) {
  var productType = getValueByElementId(id);
  var result=false;
  if (productType==="Ürün Türü Seçiniz") {
    incorrectInput.push("Ürün Türü");
  }
  else{result=true;}
  return result;
}