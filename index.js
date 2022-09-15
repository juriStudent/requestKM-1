"use strict";

// CONFIG ---- Start appName with with "http(s)://"".
const appName = "https://google"
const functionName = "123123"
// CONFIG ----

// getElementById() does not work in global scope for the functions.
let urlArray = (window.location.search).split("?");
let workerName = urlArray[1];
let vehicleDescription = urlArray[2];
let lastKM = Number(urlArray[3]);
let sessionID = urlArray[4];

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
    submit(workerName, vehicleDescription, km, sessionID);
}

function submit(workerName, vehicleDescription, km, sessionID) {
    // Azure function url goes here
    let url = `${appName}.azurewebsites.net/api/${workerName}/${vehicleDescription}/${km}/${sessionID}?code=${functionName}`;
    window.location.replace(url);
}

window.onload = function pageLoad() {
    const box = document.getElementById('userMessage');

    let statusParameter = urlArray[5];

    if (statusParameter == "ok") {
        box.style.color = "green";
        box.textContent = `Afgelegde weg verandert naar: ${lastKM}km`;

        // Hide the text input box.
        document.getElementById('km').style.display = "none";

        // Hide the submit button.
        document.getElementById("submitButton").style.display = "none";

        // Change the worker name.
        document.getElementById("workerName").textContent = `Bedankt ${workerName}!`;
    }
    else if (statusParameter == "low") {
        box.style.color = "red";
        box.textContent = `Uw km moet groter zijn dan je laatste km: ${lastKM}km`;

        // Change the worker name.
        document.getElementById("workerName").textContent = `Hallo ${workerName}! Vul hieronder uw huidige km in, voor het voertuig: ${vehicleDescription}`;
    }
    else {
        // Change the worker name.
        document.getElementById("workerName").textContent = `Hallo ${workerName}, vul hieronder uw huidige km in:`;
    }
}
