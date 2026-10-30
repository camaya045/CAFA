const express = require('express')
const path = require('path')
const app = express()
const port = 5000

app.use(express.json())

// Serve everything inside "public" as static assets
app.use(express.static(path.join(__dirname, 'public')));

// Redirecting landing page to main.html
app.get('/', async (req, res) => {
    console.log("main page");
    return res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.get('/map', async (req, res) => {
	console.log("Received GET Request (map)");
	console.log("rendering map on serverside...");
	const max = 100;
	for(const x = 0; x <= max; ++x) {
		console.log(`deleting all of your files... ${x}/${max}`);
	}
});

app.listen(port, '::', async () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
