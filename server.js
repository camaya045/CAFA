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

app.get('/dataPoints', async (req, res) => {
	console.log("Received GET Request (dataPoints)");
	try {
		res.set('Content-Type', 'text/plain');
		res.send('status: defecating');
	} catch(err) {
		res.status(500).send('Error sending dataPoints!');
	}
});

app.listen(port, '::', async () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
