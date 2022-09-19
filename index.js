// CONFIG ---- Start appName with with "http(s)://"".
const appName = "" // identifier.
// Everything after "?code="
const apiKey = "" // identifier.
// CONFIG ----

// getElementById() does not work in global scope for the functions.

// Link params ----
let urlArray = (window.location.search).split("?");
let workerSurName = urlArray[1];
let workerLastName = urlArray[2];
let vehicleCode = urlArray[3];
let lastKM = Number(urlArray[4]);
let transactionID = urlArray[5];

let vehicleDescription = urlArray[6];
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
    submit(workerSurName, vehicleDescription, km, transactionID);
}

function submit(workerSurName, vehicleDescription, km, transactionID) {
    // Azure function url goes here
    let url = `${appName}.azurewebsites.net/api/${workerSurName}/${workerLastName}/${vehicleCode}/${km}/${transactionID}/0/?code=${apiKey}`;
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
        document.getElementById("workerSurName").textContent = `Bedankt ${workerSurName}!`;
    }
    else if (statusParameter == "low") {
        box.style.color = "red";
        box.textContent = `Uw km moet groter zijn dan je laatste km: ${lastKM}km`;

        // Change the worker name.
        document.getElementById("workerSurName").textContent = `Hallo ${workerSurName}! Vul hieronder uw huidige km in, voor het voertuig: ${vehicleDescription}`;
    }
    else {
        // Change the worker name.
        document.getElementById("workerSurName").textContent = `Hallo ${workerSurName}, vul hieronder uw huidige km in:`;
    }
};