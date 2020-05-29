var data = [
  {
    "product": "",
    "id": "0",
    "price": "",
    "place": "",
  },
  {
    "product": "Äpfel",
    "id": "1",
    "price": "2.00",
    "place": "Edeka",
    },
    {
    "product": "Mehl",
    "id": "2",
    "price": "1.40",
    "place": "Lidl",
    },
    {
    "product": "Nudeln",
    "id": "3",
    "price": "1.00",
    "place": "Aldi",
    },
];


function getPriceByName(product){
  return data.filter(
    function(data){return data.product == product}
);
}

//Hallo Anna, ich habe angefangen mit JS zu programmieren. Muss die (End-)Abgabe mit Typescript sein, oder wäre es auch okay mit JS? 
//Ich werde versuchen nächste Woche auf jeden Fall noch eine Version mit TS zu schicken. Ich hoffe das ist okay!



//Alles zum Warenkorb hinzufügen
function addToCart(){

  var table = document.getElementById("myTable");
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

var e = document.getElementById("articledropdown");
var artikel = e.options[e.selectedIndex].text;

var i = document.getElementById("wheretoget");
var where = i.options[i.selectedIndex].text;

var amount = document.getElementById("howmuch").value;

var found = getPriceByName("Mehl");
var price = document.getElementById('priceend').innerHTML= found[0].price;

var b = document.getElementById("confirmOrder");
b.style.display = "block";

var d = document.getElementById("deleteOrder");
d.style.display = "block";

var amount = document.getElementById("howmuch").value;

  cell1.innerHTML = artikel;
  cell2.innerHTML = amount;
  cell3.innerHTML = where;
  cell4.innerHTML = price;


}

//Alles zum Warenkorb hinzufügen (Chores)
function addToCartChores(){

  var e = document.getElementById("newtask");
  var task = e.options[e.selectedIndex].text;
  
  var i = document.getElementById("setpayment");
  var where = i.options[e.selectedIndex].text;
  
  var amount = document.getElementById("setpayment").value;
  
  
    document.getElementById("amountend").innerHTML = amount;
    document.getElementById("productend").innerHTML = task;
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

function showFinances() {
  var checkBox = document.getElementById("gamemode3");
  var text = document.getElementById("financeInput");

  if (checkBox.checked == true){
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

//Dropdown Produkt Groceries
$(function() {
  $.each(data, function(i, option) {
      $('#articledropdown').append($('<option/>').attr("value", option.id).text(option.product));
  });
  $.each(data, function(i, option) {
    $('#wheretoget').append($('<option/>').attr("value", option.id).text(option.place));
  });
})



//Slider-Value 

//var slider = document.getElementById("myRange");
//var output = document.getElementById("demo");
//output.innerHTML = slider.value; 


//slider.oninput = function() {
  //output.innerHTML = this.value;
//} 


//Dropdown Chores
$(function() {
  var dataChores = [
    {
      "task": "",
      "id": "0",
      "payment": "",
    },
    {
      "task": "mow the lawn",
      "id": "1",
      "payment": "15.00",
      },
      {
      "task": "clean a room",
      "id": "2",
      "price": "5.00",
      },
      {
        "task": "walk the dog",
        "id": "3",
        "price": "10.00",
        },
      {
        "task": "wash the car",
        "id": "4",
        "price": "20.00",
          },
  ];
  $.each(dataChores, function(i, option) {
      $('#newtask').append($('<option/>').attr("value", option.id).text(option.task));
  });
  
})

async function sendOrder() {
  // var b = document.getElementById("confirmOrder");

  alert("Your order has been sent!");

        
}




function deleteOrder() {

  document.getElementById("myTable").deleteRow(1);

}
