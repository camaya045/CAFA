const baseurl = `${window.location.origin}`;

if(!('serial' in navigator)) {
	alert("web serial unsupported! will redirect back to map...");
	window.location.href = `${baseurl}`;
} else
{
	console.log("nice, looks like you have webserial");
	console.log(`baseurl: ${baseurl}`);
}

if(!("geolocation" in navigator)) {
	alert("geolocation polling unsupported! will redirect back to map...");
	window.location.href = `${baseurl}`;
} else {
	console.log("nice, looks like you have geolocation polling");
}

function pollLatLon(highAcc = true) {
	//this is async op!
	navigator.geolocation.getCurrentPosition(
		(position) => {
			console.log(position);
			console.log( [position.coords.latitude, position.coords.longitude] );
		},
		(error) => console.error(error.message),
		{ enableHighAccuracy: highAcc }
	);
}

pollLatLon();

/*
const arduinoBuadRate = 9600;
try {
	const port = await navigator.serial.requestPort();
	await port.open({ buadRate: arduinoBaudRate });
} catch(err) {
	console.error("webserial error:", err);
}
*/
