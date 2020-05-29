//Alles zum Warenkorb hinzufügen
function addToCart(){

var e = document.getElementById("articledropdown");
var artikel = e.options[e.selectedIndex].text;

var i = document.getElementById("wheretoget");
var where = i.options[e.selectedIndex].text;

var amount = document.getElementById("howmuch").value;


  document.getElementById("amountend").innerHTML = amount;
  document.getElementById("productend").innerHTML = artikel;
  document.getElementById("whereend").innerHTML = where;
}

// Knopf Funktionen
function showGrocery() {
  var checkBox = document.getElementById("gamemode1");
  var text = document.getElementById("groceryinput");

  if (checkBox.checked == true){
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}


function showChores() {
  var checkBox = document.getElementById("gamemode2");
  var text = document.getElementById("choreInput");

  if (checkBox.checked == true){
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

//Dropdown Produkt
$(function() {
  var data = [
    {
      "product": "",
      "id": "0",
      "price": "",
      "place": "",
    },
    {
      "product": "Toilettenpapier",
      "id": "1",
      "price": "20",
      "place": "Edeka",
      },
      {
      "product": "Desinfektionsmittel",
      "id": "2",
      "price": "200",
      "place": "Lidl",
      }
  ];
  $.each(data, function(i, option) {
      $('#articledropdown').append($('<option/>').attr("value", option.id).text(option.product));
  });
  $.each(data, function(i, option) {
    $('#wheretoget').append($('<option/>').attr("value", option.id).text(option.place));
  });
})



