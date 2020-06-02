namespace L06_Haushilfe{

    export interface Item {
        name: string;
        items: string [];
    }

    export interface Data {
        [category: string]: Item[];

    }

    export function generateContent(_data: Data): void {
        console.log(_data);

        let form: HTMLFormElement = <HTMLFormElement>document.querySelector("form");

        let fieldsets: HTMLFieldSetElement = document.createElement("fieldset");
        fieldsets.id = "fieldsets";

        let fieldeinkauf: HTMLFieldSetElement = document.createElement("fieldset");
        fieldeinkauf.id = "fieldeinkauf";
        fieldeinkauf.disabled = true;

        let fieldhaushalt:  HTMLFieldSetElement = document.createElement("fieldset");
        fieldhaushalt.id = "fieldhaus";
        fieldhaushalt.disabled = true;

        let legendfieldsets: HTMLLegendElement = document.createElement("legend");
        legendfieldsets.innerHTML = "Aufgaben";
        let legendeinkauf: HTMLLegendElement = document.createElement("legend");
        legendeinkauf.innerHTML = "Einkauf";
        let legendhaushalt: HTMLLegendElement = document.createElement("legend");
        legendhaushalt.innerHTML = "Householdtasks";

        form.appendChild(fieldsets);
        form.appendChild(fieldeinkauf);
        form.appendChild(fieldhaushalt);

        fieldsets.appendChild(legendfieldsets);
        fieldeinkauf.appendChild(legendeinkauf);
        fieldhaushalt.appendChild(legendhaushalt);

        for (let category in _data) {

            let items: Item[] = _data[category];
            console.log("items:", items);

            let group: HTMLElement | null = null; 
            switch (category) {
                case "fieldsets": 
                    group = createTasks(items, category); 
                    break;
                case "fieldeinkauf": 
                    group = createEinkauf(items, category);
                    break;
                case "fieldhaushalt":
                    group = createHouseholdTasks(items, category);
                    break;

                default:
                    break; 

            }

            let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.appendChild(group);


        }
    }


    function createTasks(_items: Item[], _category: string): HTMLElement | null {

        console.log("createTasks");
        let group: HTMLDivElement = document.createElement("div");

        for (let item of _items) {
            let radiotasks: HTMLInputElement = document.createElement("input"); 
            let label: HTMLLabelElement = document.createElement("label");
            radiotasks.name = item.name;
            radiotasks.type = "radio";
            radiotasks.id = item.items[0];
            radiotasks.value = item.items[0];

            label.htmlFor = radiotasks.id;
            label.textContent = item.items[0];

            group.appendChild(label);
            group.appendChild(radiotasks);

            console.log("group:", group);
        }
        return group; 

    }

    function createEinkauf(_items: Item[], _category: string): HTMLElement | null {
        console.log("CreateEinkauf");
        let group: HTMLDivElement = document.createElement("div");
        let selectarticle: HTMLSelectElement = document.createElement("select");
        let amount: HTMLInputElement = document.createElement("input");
        let selectstore: HTMLSelectElement = document.createElement("select");
        let okbutton: HTMLButtonElement = document.createElement("button");
        okbutton.id = "einkaufbestätigen";
        okbutton.type = "button";
        okbutton.textContent = "In den Warenkorb";
        for (let item of _items) {

            switch (item.name) {
                case "groceries":
                    selectarticle.name = item.name;
                    group.appendChild(selectarticle);
                    let optionarticle: HTMLOptionElement = document.createElement("option");
                    optionarticle.setAttribute("price", item.items[1]); 
                    optionarticle.setAttribute("unit", item.items[0]);
                    optionarticle.value = item.items[0];
                    optionarticle.text = item.items[0];
                    selectarticle.appendChild(optionarticle);
                    break;
                
                case "Amount":
                    amount.type = "number";
                    amount.name = item.name;
                    amount.min = "1.0";
                    amount.max = "10.0";
                    amount.step = "1.0";
                    amount.id = item.items[0];
                    amount.placeholder = "Anzahl";
                    group.appendChild(amount);
                    break;
        
        
                case "store":
                    selectstore.name = item.name; 
                    group.appendChild(selectstore);

                    let optionstore: HTMLOptionElement = document.createElement("option");
                    optionstore.value = item.items[0];
                    optionstore.text = item.items[0];
                    selectstore.appendChild(optionstore);
                    break;
                default:
                    break;
            }

            group.appendChild(okbutton);

        }
        return group;

    }

    function createHouseholdTasks (_items: Item [], _category: string): HTMLElement | null {

        let group: HTMLElement = document.createElement("div"); 
        let amount: HTMLInputElement = document.createElement("input");
        let okbutton: HTMLButtonElement = document.createElement("button");
        okbutton.id = "einkaufbestätigenhh";
        okbutton.type = "button";
        okbutton.textContent = "In den Warenkorb";

        for (let item of _items) {
            switch (item.name) {
                case "household":
                    let checkbox: HTMLInputElement = document.createElement("input"); 
                    let label: HTMLLabelElement = document.createElement("label"); 
                    checkbox.type = "checkbox"; 
                    checkbox.id = item.items[0]; 
                    checkbox.setAttribute("price", item.items[1]); 
                    checkbox.setAttribute("unit", item.items[0]);
                    checkbox.value = item.items[1]; 
                    checkbox.name = item.items[0]; 
                    checkbox.id = item.name; 

                    label.textContent = item.items[0]; 
                    label.htmlFor = checkbox.id; 
            
                    group.appendChild(checkbox); 
                    group.appendChild(label); 
                    
                    break;

                    case "Amount":
                    amount.type = "number";
                    amount.name = item.name;
                    amount.min = "1.0";
                    amount.max = "10.0";
                    amount.step = "1.0";
                    amount.id = item.items[0];
                    amount.placeholder = "Anzahl";
                    group.appendChild(amount);
                    break;   
            
                default:
                    break;
            }
            group.appendChild(okbutton);
        }
        return group;

                
            

    }
}