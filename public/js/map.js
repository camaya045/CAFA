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

async function fetchOpenAirChicagoData() {
	try {
		//"https://data.cityofchicago.org/Health-Human-Services/Open-Air-Chicago-Hour-Aggregations/di9s-96ws/about_data"
		const response = await fetch("https://data.cityofchicago.org/resource/di9s-96ws.json");
		if(!response.ok) {
			throw new Error(`error while fetching: ${response.status}`);
		}
		const data = await response.json();
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
fetchOpenAirChicagoData();

async function fetchDataPoints() {
	fetch('/dataPoints').then(response => {
		if (!response.ok) {
		  throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response.text();
	}).then(data => {
		console.log(data);
	}).catch(error => console.error('Request failed', error));
}
fetchDataPoints();

function plotDataPointsAsPath() {
	try {

		//assuming data points are in format (or something like that):
		/*
			{
				latitude,
				longitude,
				pm2Level
			}
		*/

		const data = [
			{
				latitude: 41.831097,
				longitude: -87.623261,
				pm2: 10
			},
			{
				latitude: 41.832866,
				longitude: -87.623275,
				pm2: 20
			},
			{
				latitude: 41.834681,
				longitude: -87.623361,
				pm2: 30
			},
			{
				latitude: 41.834695,
				longitude: -87.625031,
				pm2: 40
			}
		];

		for(var x = 0; x < data.length; ++x) {
			const coord = [data.at(x).latitude, data.at(x).longitude];
			const pm2 = data.at(x).pm2;
			new Circle(coord, {
				color: 'cyan',
				fillColor: '#f03',
				fillOpacity: 0.3,
				radius: 50
			}).bindPopup(
				pm2
			).addTo(map);
		}
	} catch (error) {
		console.error("plotDataPointsAsPath() error: ", error);
	}
}
plotDataPointsAsPath();
