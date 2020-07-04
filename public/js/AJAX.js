function load(method, url, responseCallback, callbackArgs={}) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if(this.readyState == 4) {
			// console.log("Response text:", this.responseText);
			let res = JSON.parse(this.responseText);
			res.httpStatus = this.status;
			if(res.err) {
				console.log("Some error happens");
			} else {
				responseCallback(res, callbackArgs);
			}
		}
	}
	xhttp.open(method, url, true);
	xhttp.send();
}

function loadWithParams(method, url, params, responseCallback, callbackArgs={}) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if(this.readyState == 4) {
			// console.log("Response text:", this.responseText);
			let res = JSON.parse(this.responseText)
			res.httpStatus = this.status;
			if(res.err) {
				console.log("Some error happens");
			} else {
				responseCallback(res, callbackArgs);
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