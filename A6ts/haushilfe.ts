

namespace L06_Haushilfe {
    window.addEventListener("load", handleLoad);
    let totalcost: number = 0;
    //let url: string = "haushilfe.html";
    let url: string = "http://localhost:5001";

    async function handleLoad(_event: Event): Promise<void> {
        
        let response: Response = await fetch("articles.json"); 
        let offer: string = await response.text(); 
        let data: Data = JSON.parse(offer); 

        generateContent(data);

        console.log("verknüpft");

        //Festlegung der Variablen mit Verbindung der Elemente aus dem HTML Code

        let einkaufen: HTMLInputElement = <HTMLInputElement>document.querySelector("#Einkaufen");
        let haushalt: HTMLInputElement = <HTMLInputElement>document.querySelector("#Chores");

        let fieldeinkauf: HTMLFieldSetElement = <HTMLFieldSetElement>document.querySelector("#FeldEinkaufen");
        let fieldhaushalt: HTMLFieldSetElement = <HTMLFieldSetElement>document.querySelector("#FeldChores");
      
        let geteinkauf: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#einkaufbestätigen");
        let gethaushalt: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#einkaufbestätigenhh");

        let submit: HTMLButtonElement= <HTMLButtonElement>document.querySelector("button#abschicken");
        console.log("abgeschickt");

        // Installation der Listener

        einkaufen.addEventListener("click", showfieldset);
        haushalt.addEventListener("click", showfieldset);

        geteinkauf.addEventListener("click", handleChange);
        gethaushalt.addEventListener("click", handleChange);

        submit.addEventListener("click", sendInOrder);


        // Funktion 1: Je nachdem welchen Button (Einkaufen oder Chores) ich klicke, soll sich der Inhalt anzeigen lassen

        function showfieldset(): void {

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




     }

     // Asynchrone Funktion, die die Bestellung an den Server schickt 

     async function sendInOrder(_event: Event): Promise<void> {
         console.log("Bestellung wird abgeschickt");

         let formData: FormData = new FormData(document.forms[0]);
         let query: URLSearchParams = new URLSearchParams(<any>formData);
         let response: Response = await fetch(url + "?" + query.toString()) ;
         let responseText: string = await response.text();
         alert(responseText);
         

     }

     // Funktion, die eine Bestellung wieder löscht 

     function deleteanorder(_prices: number, _event: any, _gesamt:any): void{
         totalcost -= _prices;
         _gesamt.innerHTML = "" + totalcost.toFixed(2);
         console.log(totalcost);

         let deletespan: Node = <Node>_event.target;
         let getparentdiv: Node = <Node>deletespan.parentNode;
         let getgrandparentdiv: Node = <Node>getparentdiv.parentNode;
         getgrandparentdiv.removeChild(getparentdiv); 
     }

     //Funktion HandleChange

     function handleChange(): void {

         let diveinkauf: HTMLDivElement = <HTMLDivElement>document.querySelector("#diveinkauf");
         let divchores: HTMLDivElement = <HTMLDivElement>document.querySelector("#divchores");
         let total: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#total");

         let formData: FormData = new FormData(document.forms[0]);

         for (let entry of formData) {
             let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[1] + "']");
             console.log(entry);

             console.log("entry[1]:", entry[1]);

             let amount: number = Number(formData.get("Amount"));
             let price: number = Number(item.getAttribute("price"));

             console.log(item);
             console.log("Item: ", item.value);
             console.log("Price: " + price);
             console.log("Amount: ", amount);
             let prices: number;

             let span1: HTMLSpanElement = document.createElement("span");
             let span2: HTMLSpanElement = document.createElement("span");
             let span3: HTMLSpanElement = document.createElement("span");
             let span4: HTMLSpanElement = document.createElement("span");

             let orderorder: HTMLDivElement = document.createElement("div");

             let deletebutton: HTMLButtonElement = document.createElement("button");
             deletebutton.classList.add("far", "fa-trash-alt");

             switch (entry[0]) {
                
                case "groceries": 

                    let store: string = String(formData.get("store"));
                    prices = amount * price;
                    deletebutton.addEventListener("click", function (): void {
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

                deletebutton.addEventListener("click", function (): void {
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

                    deletebutton.addEventListener("click", function (): void {
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


}