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
			throw new Error(`idk what went wrong lol: ${response.status}`);
		}
		const data = await response.json();
		for(var x = 0; x < data.length; ++x) {
			const coord = [data.at(x).location.coordinates.at(1), data.at(x).location.coordinates.at(0)];
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
		console.error("your code sucks lol: ", error);
	}
}
fetchOpenAirChicagoData();
