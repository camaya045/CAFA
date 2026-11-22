const baseurl = `${window.location.origin}`;

if(!('serial' in navigator)) {
	alert("web serial unsupported! will redirect back to map...");
	window.location.href = `${baseurl}`;
} else
{
	alert("nice, looks like you have webserial");
	alert(`baseurl: ${baseurl}`);
}

/*
const arduinoBuadRate = 9600;
try {
	const port = await navigator.serial.requestPort();
	await port.open({ buadRate: arduinoBaudRate });
} catch(err) {
	console.error("webserial error:", err);
}
*/
