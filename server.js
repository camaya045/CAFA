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

app.listen(port, '::', async () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
