var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var L06_Haushilfe;
(function (L06_Haushilfe) {
    window.addEventListener("load", handleLoad);
    let totalcost = 0;
    //let url: string = "haushilfe.html";
    let url = "https://beliemasapp.herokuapp.com";
    function handleLoad(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch("articles.json");
            let offer = yield response.text();
            let data = JSON.parse(offer);
            L06_Haushilfe.generateContent(data);
            console.log("verknüpft");
            //Festlegung der Variablen mit Verbindung der Elemente aus dem HTML Code
            let einkaufen = document.querySelector("#Einkaufen");
            let haushalt = document.querySelector("#Chores");
            let fieldeinkauf = document.querySelector("#FeldEinkaufen");
            let fieldhaushalt = document.querySelector("#FeldChores");
            let geteinkauf = document.querySelector("#einkaufbestätigen");
            let gethaushalt = document.querySelector("#einkaufbestätigenhh");
            let submit = document.querySelector("button#abschicken");
            console.log("abgeschickt");
            // Installation der Listener
            einkaufen.addEventListener("click", showfieldset);
            haushalt.addEventListener("click", showfieldset);
            geteinkauf.addEventListener("click", handleChange);
            gethaushalt.addEventListener("click", handleChange);
            submit.addEventListener("click", sendInOrder);
            // Funktion 1: Je nachdem welchen Button (Einkaufen oder Chores) ich klicke, soll sich der Inhalt anzeigen lassen
            function showfieldset() {
                if (einkaufen.checked == true) {
                    fieldeinkauf.disabled = false;
                    fieldhaushalt.disabled = true;
                    console.log("Einkaufen wird angezeigt");
                }
                else if (haushalt.checked == true) {
                    fieldeinkauf.disabled = true;
                    fieldhaushalt.disabled = false;
                    console.log("Haushalt wird angezeigt");
                }
            }
        });
    }
    // Asynchrone Funktion, die die Bestellung an den Server schickt 
    function sendInOrder(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Bestellung wird abgeschickt");
            let formData = new FormData(document.forms[0]);
            let query = new URLSearchParams(formData);
            let response = yield fetch(url + "?" + query.toString());
            let responseText = yield response.text();
            alert(responseText);
        });
    }
    // Funktion, die eine Bestellung wieder löscht 
    function deleteanorder(_prices, _event, _gesamt) {
        totalcost -= _prices;
        _gesamt.innerHTML = "" + totalcost.toFixed(2);
        console.log(totalcost);
        let deletespan = _event.target;
        let getparentdiv = deletespan.parentNode;
        let getgrandparentdiv = getparentdiv.parentNode;
        getgrandparentdiv.removeChild(getparentdiv);
    }
    //Funktion HandleChange
    function handleChange() {
        let diveinkauf = document.querySelector("#diveinkauf");
        let divchores = document.querySelector("#divchores");
        let total = document.querySelector("#total");
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) {
            let item = document.querySelector("[value='" + entry[1] + "']");
            console.log(entry);
            console.log("entry[1]:", entry[1]);
            let amount = Number(formData.get("Amount"));
            let price = Number(item.getAttribute("price"));
            console.log(item);
            console.log("Item: ", item.value);
            console.log("Price: " + price);
            console.log("Amount: ", amount);
            let prices;
            let span1 = document.createElement("span");
            let span2 = document.createElement("span");
            let span3 = document.createElement("span");
            let span4 = document.createElement("span");
            let orderorder = document.createElement("div");
            let deletebutton = document.createElement("button");
            deletebutton.classList.add("far", "fa-trash-alt");
            switch (entry[0]) {
                case "groceries":
                    let store = String(formData.get("store"));
                    prices = amount * price;
                    deletebutton.addEventListener("click", function () {
                        deleteanorder(prices, event, total);
                    });
                    span1.innerHTML = " " + amount;
                    span2.innerHTML = " " + entry[1];
                    span3.innerHTML = " Laden: " + store;
                    span4.innerHTML = " Preis: " + prices + "€";
                    diveinkauf.appendChild(orderorder);
                    orderorder.appendChild(deletebutton);
                    orderorder.appendChild(span1);
                    orderorder.appendChild(span2);
                    orderorder.appendChild(span3);
                    orderorder.appendChild(span4);
                    totalcost += prices;
                    break;
                case "Rasen mähen":
                    prices = price * amount;
                    span1.innerHTML = " " + entry[0] + ":";
                    span2.innerHTML = " " + amount + " | ";
                    span3.innerHTML = " Preis: " + prices + "€";
                    console.log(item);
                    deletebutton.addEventListener("click", function () {
                        deleteanorder(prices, event, total);
                    });
                    divchores.appendChild(orderorder);
                    orderorder.appendChild(deletebutton);
                    orderorder.appendChild(span1);
                    orderorder.appendChild(span2);
                    orderorder.appendChild(span3);
                    totalcost += prices;
                    break;
                case "Raum putzen":
                    prices = price * amount;
                    span1.innerHTML = " " + entry[0] + ":";
                    span2.innerHTML = " " + amount + " Zimmer" + " | ";
                    span3.innerHTML = " Preis: " + prices + "€";
                    console.log(item);
                    deletebutton.addEventListener("click", function () {
                        deleteanorder(prices, event, total);
                    });
                    divchores.appendChild(orderorder);
                    orderorder.appendChild(deletebutton);
                    orderorder.appendChild(span1);
                    orderorder.appendChild(span2);
                    orderorder.appendChild(span3);
                    totalcost += prices;
                    break;
                default:
                    break;
            }
            console.log(total);
            console.log(totalcost);
            total.innerHTML = totalcost.toFixed(2);
        }
    }
})(L06_Haushilfe || (L06_Haushilfe = {}));
//# sourceMappingURL=haushilfe.js.map