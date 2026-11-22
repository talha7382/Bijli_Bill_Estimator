
let appliances = [];

const input_name = document.getElementById("appliance-name");
const input_watts = document.getElementById("watts");
const input_hours = document.getElementById("hours/day");
const add_btn = document.getElementById("add-btn");

const table_body = document.getElementById("appliance-list");

const total_units = document.getElementById("total-units");
const total_bill = document.getElementById("total-bill");
const top_appliance = document.getElementById("top-appliance");

add_btn.addEventListener("click", function () {
        let name = input_name.value.trim();
        let watts = Number(input_watts.value);
        let hours = Number(input_hours.value);

        if (name === "" || watts <= 0 || hours <= 0 || hours > 24) {
            alert("Please enter valid details");
            return;
        }

        let units = watts * hours * 30 / 1000;
        
        let row = {
            name: name,
            watts: watts,
            hours: hours,
            units: units
        };

        appliances.push(row);
        input_name.value = "";
        input_watts.value = "";
        input_hours.value = "";

        showAppliances();
    }
)

function showAppliances() {
    let html = "";
    for (let i = 0; i < appliances.length; i++) {
        html += "<tr>" +
        "<td>" + appliances[i].name + "</td>" +
        "<td>" + appliances[i].watts + "</td>" + 
        "<td>" + appliances[i].hours + "</td>" + 
        "<td>" + appliances[i].units.toFixed(1) + "</td>" +   
        "<td>" + "<button class = 'remove-btn' data-index='" + i + "'>Remove</button> </td>" +
        "</tr>";
    }
    document.getElementById("appliance-list").innerHTML = html;
    let remove_btns = document.querySelectorAll(".remove-btn");
    for (let i = 0; i < remove_btns.length; i++) {
        remove_btns[i].addEventListener("click", function () {
                let index = Number(remove_btns[i].getAttribute("data-index"));
                appliances.splice(index, 1);
                showAppliances();
            }
        )
    }
}
