import { LeafletMap, TileLayer, Circle } from 'leaflet';

// the map code goes here
// https://leafletjs.com/examples/quick-start/
const chicagoCenterLoopCoordinates = [41.882081, -87.630951];
const BronzeVilleIITCoordinates = [41.831966, -87.626120];
const startingZoom = 13;

const map = new LeafletMap('map').setView(chicagoCenterLoopCoordinates, startingZoom);
new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function fetchOpenAirChicagoData(booleanFetchHourlyOtherwiseDaily = true) {
	try {
		//hourly aggregations
		//"https://data.cityofchicago.org/Health-Human-Services/Open-Air-Chicago-Hour-Aggregations/di9s-96ws/about_data"
		const hourlyLink = "https://data.cityofchicago.org/resource/di9s-96ws.json";
		//daily aggregations
		//"https://data.cityofchicago.org/Health-Human-Services/Open-Air-Chicago-Day-Aggregations/rtmx-vkjr/about_data"
		const dailyLink = "https://data.cityofchicago.org/resource/rtmx-vkjr.json";

		var endpoint = "";
		if(booleanFetchHourlyOtherwiseDaily) {
			endpoint = hourlyLink;
		} else
		{
			endpoint = dailyLink;
		}
		const response = await fetch(endpoint);

		if(!response.ok) {
			throw new Error(`error while fetching: ${response.status}`);
		}
		const data = await response.json();
		console.log(`fetched ${booleanFetchHourlyOtherwiseDaily ? "hourly" : "daily"} open air chicago data.`);
		console.log(`data length: ${data.length}`);
		for(var x = 0; x < data.length; ++x) {
			const coord = [data.at(x).latitude, data.at(x).longitude];
			const sensorName = data.at(x).sensor_name;
			new Circle(coord, {
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.3,
				radius: 100
			}).bindPopup(
				sensorName
			).addTo(map);
		}
	} catch (error) {
		console.error("fetchOpenAirChicagoAir() error: ", error);
	}
}
fetchOpenAirChicagoData(false);

async function fetchDataPoints() {
	fetch('/dataPoints').then(response => {
		if (!response.ok) {
		  throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response.text();
	}).then(data => {
		const parsedData = data.split('\n');
		console.log(parsedData);
		for(var x = 0; x < parsedData.length; ++x) {
			const coord = [parsedData.at(x).split(' ')[0], parsedData.at(x).split(' ')[1]];
			const pm2 = parsedData.at(x).split(' ')[2];
			new Circle(coord, {
				color: 'cyan',
				fillColor: '#f03',
				fillOpacity: 0.3,
				radius: 1
			}).bindPopup(
				pm2
			).addTo(map);
		}
	}).catch(error => console.error('Request failed', error));
}
fetchDataPoints();

//webserial button:
const webserialButton = document.getElementById('webserial');
webserialButton.addEventListener("click", function() {
	const baseurl = `${window.location.origin}`;
	window.location.href = `${baseurl}/webserial.html`;
});
