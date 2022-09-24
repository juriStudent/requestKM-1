// CONFIG ---- Start appName with with "http(s)://"".
const appName = "https://juri-km-test" // identifier.
// CONFIG ----

// getElementById() does not work in global scope for the functions.

// Link params ----
let urlArray = (window.location.search).split("?");
let workerfirstName = urlArray[1].toLowerCase();

// Make the first letter upper and the rest lowercase.
workerfirstName = workerfirstName.charAt(0).toUpperCase() + workerfirstName.slice(1);


let workerLastName = urlArray[2];
let vehicleCode = urlArray[3];
let lastKM = Number(urlArray[4]);
let transactionID = urlArray[5];

let vehicleDescription = String(urlArray[6]).replaceAll("%20", " ");
let statusParameter = urlArray[7];
// Link params ----


addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        clickedSubmit(document.getElementById('km').value);
    }
});


function clickedSubmit(input) {
    const box = document.getElementById('userMessage');
    let km = Number(input);

    // Input is not a number.
    if (isNaN(km)) {
        if (box != null) {
            box.style.color = 'red';
            box.textContent = "Typ alleen cijfers.";
        }
        return;
    }

    // Input is less then the previous km provided in the link.
    if (km < lastKM) {
        if (box != null) {
            box.style.color = "red";
            box.textContent = `Uw km moet groter zijn dan je laatste km: ${lastKM}km`;
        }
        return;
    }

    // Send it to the Azure function.
    submit(workerfirstName, vehicleDescription, km, transactionID);
}

function submit(workerfirstName, vehicleDescription, km, transactionID) {
    // Azure function url goes here
    let url = `${appName}.azurewebsites.net/api/${workerfirstName}/${workerLastName}/${vehicleCode}/${km}/${transactionID}/0`;
    window.location.replace(url);
}

window.onload = function pageLoad() {
    const box = document.getElementById('userMessage');

    if (statusParameter == "ok") {
        box.style.color = "green";
        box.textContent = `Afgelegde weg verandert naar: ${lastKM}km`;

        // Hide the text input box.
        document.getElementById('km').style.display = "none";

        // Hide the submit button.
        document.getElementById("submitButton").style.display = "none";

        // Change the worker name.
        document.getElementById("workerfirstName").textContent = `Bedankt ${workerfirstName}!`;
    }
    else if (statusParameter == "low") {
        box.style.color = "red";
        box.textContent = `Uw km moet groter zijn dan je laatste km: ${lastKM}km`;

        // Change the worker name.
        document.getElementById("workerfirstName").textContent = `Hallo ${workerfirstName}! Vul hieronder uw huidige km in, voor het voertuig: ${vehicleDescription}`;
    }
    else {
        // Change the worker name.
        document.getElementById("workerfirstName").textContent = `Hallo ${workerfirstName}, vul hieronder uw huidige km in voor ${vehicleDescription}`;
    }
};