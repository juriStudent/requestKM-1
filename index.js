// CONFIG ---- Start appName with with "http(s)://"".
const appName = "https://juri-km-test"; // identifier.
// CONFIG ----

// getElementById() does not work in global scope for the functions.

// Link params ----
let urlArray = window.location.search.split("?");
let firstName = urlArray[1];

let workerLastName = urlArray[2];
let vehicleCode = urlArray[3];
let lastKM = Number(urlArray[4]);
let transactionID = urlArray[5];

let vehicleDescription = String(urlArray[6]).replaceAll("%20", " ");
let statusParameter = urlArray[7];
// Link params ----

addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    clickedSubmit(document.getElementById("km").value);
  }
});

function clickedSubmit(input) {
  const box = document.getElementById("userMessage");
  let km = Number(input);

  // Input is not a number.
  if (isNaN(km)) {
    if (box != null) {
      box.style.color = "red";
      box.textContent = "Typ alleen cijfers.";
    }
    return;
  }

  // Input is less then the previous km provided in the link.
  if (km < lastKM) {
    if (box != null) {
      box.style.color = "red";
      box.textContent = `KM stand moet groter zijn dan je laatste: ${lastKM}km`;
    }
    return;
  }

  // Send it to the Azure function.
  console.log("TEST1");
  submit(firstName, vehicleDescription, km, transactionID);
}

function submit(firstName, vehicleDescription, km, transactionID) {
  // Azure function url goes here
  let url = `${appName}.azurewebsites.net/api/${firstName}/${workerLastName}/${vehicleCode}/${km}/${transactionID}/0`;
  window.location.replace(url);
  console.log("TEST");
}

window.onload = function pageLoad() {
  const box = document.getElementById("userMessage");

  if (statusParameter == "ok") {
    box.style.color = "green";
    box.textContent = `Afgelegde weg verandert naar: ${lastKM}km`;

    // Hide the text input box.
    document.getElementById("km").style.display = "none";

    // Hide the submit button.
    document.getElementById("submitButton").style.display = "none";
  } else if (statusParameter == "low") {
    box.style.color = "red";
    box.textContent = `Uw km moet groter zijn dan je laatste km: ${lastKM}km`;
  }

  if (statusParameter != "ok") {
    document.getElementById(
      "welcome"
    ).innerHTML = `<p class='center text-large' >Hallo ${firstName}! </p><p class='center text-normal' >Vul hieronder uw huidige km in, voor het voertuig: <br/>${vehicleDescription}</p>`;
  }
};
