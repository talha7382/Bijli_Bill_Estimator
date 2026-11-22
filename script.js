
let appliances = [];

const slabs = [
    {upTo: 100, rate: 22.44},
    {upTo: 200, rate: 28.91},
    {upTo: 300, rate: 33.10},
    {upTo: 400, rate: 36.46},
    {upTo: 500, rate: 38.95},
    {upTo: 600, rate: 40.22},
    {upTo: 700, rate: 41.85},
    {upTo: Infinity, rate: 47.20}
];


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

    calculateTotals();

    saveData();

}

function calculateTotals() {
    let total_units = 0, biggest = 0, biggest_ind = 0;

    if (appliances.length === 0) {
        document.getElementById("total-units").textContent = "0";
        document.getElementById("top-appliance").textContent = "None yet";
        document.getElementById("total-bill").textContent = "0";
        return;
    }

    for (let i = 0; i < appliances.length; i++) {
        total_units += appliances[i].units;
        if (biggest < appliances[i].units) {
            biggest = appliances[i].units;
            biggest_ind = i;
        }

    }
    
    document.getElementById("total-units").textContent = total_units.toFixed(1);
    document.getElementById("top-appliance").textContent = appliances[biggest_ind].name;
   
    document.getElementById("total-bill").textContent = calculateBill(total_units);

}

function calculateBill(total_units) {
    let cost = 0, previousLimit = 0;
    for (let i = 0; i < slabs.length; i++) {
        if (total_units > previousLimit) {
            let inThisSlab = Math.min(total_units, slabs[i].upTo) - previousLimit;
            cost += inThisSlab * slabs[i].rate;
        }
        previousLimit = slabs[i].upTo;
    }
    return cost;
}

function saveData() {
    localStorage.setItem("appliances", JSON.stringify(appliances));
}

const saved = localStorage.getItem("appliances");

if (saved !== null) {
    appliances = JSON.parse(saved);
}
showAppliances();
