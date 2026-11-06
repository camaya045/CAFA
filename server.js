const express = require('express')
const path = require('path')
const app = express()
const port = 5000

app.use(express.json())

// Serve everything inside "public" as static assets
app.use(express.static(path.join(__dirname, 'public')));

// Redirecting landing page to main.html
var totalVisitsSinceBoot = 0;
app.get('/', async (req, res) => {
	const visitorIp = req.ip;
	console.log(`visitor: ${visitorIp}`);
    console.log(`totalVisitsSinceBoot: ${++totalVisitsSinceBoot}`);
    return res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.post('/map', async (req, res) => {
	console.log("Received POST Request (map)");
	console.log("rendering map on serverside...");

	const stylesheetPath = path.join(__dirname, "maps/stylesheet.xml")
	console.log(`stylesheetPath: ${stylesheetPath}`);

	var mapnik = require("@mapnik/mapnik");
	var fs = require("fs");
	mapnik.register_default_fonts();
	mapnik.register_default_input_plugins();
	var map = new mapnik.Map(256, 256);
	map.load(stylesheetPath, function(err, map) {

		if(err) {
			console.error('map.load(...) error: ', err);
		}

		map.zoomAll();
		var im = new mapnik.Image(256, 256);
		map.render(im, function(err, im) {
			im.encode("png", function(err, buffer) {
				fs.writeFile("map.png", buffer);
			 });
		});
	});

});

app.listen(port, '::', async () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
