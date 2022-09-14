let urlArray = (window.location.search).split("?");
let workerName = urlArray[1];
let vehicleDescription = urlArray[2];
let lastKM = Number(urlArray[3]);
let sessionID = urlArray[4];


addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        clickedSubmit(document.getElementById('km').value)
    }
});

"use strict";
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
    // is equal allowed???????????????????????????????
    if (km <= lastKM) {
        if (box != null) {
            box.style.color = "red";
            box.textContent = `Uw km moet groter zijn dan je laatste km: ${lastKM}km`;
        }
        return;
    }
    submit(workerName, vehicleDescription, km, sessionID);
}
function submit(workerName, vehicleDescription, km, sessionID) {

        // URL!!!
    let url = `.azurewebsites.net/api/${workerName}/${vehicleDescription}/${km}/${sessionID}?code=`
    // let url = `http://localhost:7071/api/${workerName}/${vehicleDescription}/${km}/${sessionID}`;
    window.location.replace(url);
}
//?{Name}?{vehicleDescription}?{km}?{sessionID}
//?Cedric?ABC123?12312312?XYZ123

window.onload = function pageLoad() {
    // Do not reoder stuff that uses getElementById
    const box = document.getElementById('userMessage');


    if (urlArray[5] == "ok") {
        box.style.color = "green";
        box.textContent = `Afgelegde weg verandert naar: ${lastKM}km`;

        // Hide the text input box.
        document.getElementById('km').style.display = "none";

        // Hide the submit button.
        document.getElementById("submitButton").style.display = "none";

        // Change the worker name.
        document.getElementById("workerName").textContent = `Bedankt ${workerName}!`;
    }
    else if (urlArray[5] == "low") {
        box.style.color = "red";
        box.textContent = `Uw km moet groter zijn dan je laatste km: ${lastKM}km`;

        // Change the worker name.
        document.getElementById("workerName").textContent = `Hallo ${workerName}! Vul hieronder uw huidige km in, voor het voertuig: ${vehicleDescription}`
    }
    else {
        // Change the worker name.
        document.getElementById("workerName").textContent = `Hallo ${workerName}, vul hieronder uw huidige km in:`
    }



}
