function clickedSubmit(input: string) {
	const box = document.getElementById('userMessage');

	let km = Number(input)

	let urlArray = (window.location.search).split("?")

	let name = urlArray[1]
	let vehicleCode = urlArray[2]
	let lastKM = Number(urlArray[3])
	let sessionID = urlArray[4]

	// Input is not a number.
	if (isNaN(km)) {
		if (box != null) {
			box.style.color = 'red';
			box.textContent = "Typ alleen cijfers."
		}
		return
	}

	// is equal allowed???????????????????????????????
	if (km <= lastKM) {
		if (box != null) {
			box.style.color = "red";
			box.textContent = `Uw km moet groter zijn dan je laatste km: ${ lastKM }km`
		}

		return
	}

	alert(km)
}

function submit(km: number, sessionID: string) {
	let url = `https://google.com/${ Number }/${ sessionID }/asohudoasdasdasd`
	window.location.replace(url)
}

//?{Name}?{vehicleCode}?{km}?{sessionID}
//?Cedric?ABC123?12312312?XYZ123