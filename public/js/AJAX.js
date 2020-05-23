function load(method, url, responseCallback) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200) {
			// console.log("Response text:", this.responseText);
			let res = JSON.parse(this.responseText);
			if(res.err) {
				console.log("Some error happens");
			} else {
				responseCallback(res);
			}
		}
	}
	xhttp.open(method, url, true);
	xhttp.send();
}

function loadWithParams(method, url, params, responseCallback) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if(this.readyState == 4 && this.status == 200) {
			// console.log("Response text:", this.responseText);
			let res = JSON.parse(this.responseText)
			if(res.err) {
				console.log("Some error happens");
			} else {
				responseCallback(res);
			}
		}
	}
	xhttp.open(method, url, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
	let paramsString = ``;
	for(let key in params) {
		paramsString += `${key}=${params[key]}&`;
	}
	// console.log(paramsString.substr(0, paramsString.length-1))
	xhttp.send(paramsString.substr(0, paramsString.length-1));
}