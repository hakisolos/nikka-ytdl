/* app.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all requests
app.use(cors());
app.use(express.json());
app.use(express.static('/index')); // Serve static files like HTML, CSS, JS

// API for downloading MP3
app.get('/download/mp3', async (req, res) => {
    const url = req.query.url;
    const apiKey = 'gifted';
    const apiUrl = `https://api.giftedtech.my.id/api/download/ytmp3?apikey=${apiKey}&url=${encodeURIComponent(url)}`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch MP3 details' });
    }
});

// API for downloading MP4
app.get('/download/mp4', async (req, res) => {
    const url = req.query.url;
    const apiKey = 'gifted';
    const apiUrl = `https://api.giftedtech.my.id/api/download/ytmp4v2?apikey=${apiKey}&url=${encodeURIComponent(url)}`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch MP4 details' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
*/
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Enable CORS for all requests
app.use(cors());
app.use(express.json());

// Serve static files like HTML, CSS, JS from the current directory
app.use(express.static(__dirname)); // __dirname points to the directory where app.js is located

// Home route - serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve the home page (index.html)
});

// API for downloading MP3
app.get('/download/mp3', async (req, res) => {
    const url = req.query.url;
    const apiKey = 'gifted';
    const apiUrl = `https://api.giftedtech.my.id/api/download/ytmp3?apikey=${apiKey}&url=${encodeURIComponent(url)}`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch MP3 details' });
    }
});

// API for downloading MP4
app.get('/download/mp4', async (req, res) => {
    const url = req.query.url;
    const apiKey = 'gifted';
    const apiUrl = `https://api.giftedtech.my.id/api/download/ytmp4v2?apikey=${apiKey}&url=${encodeURIComponent(url)}`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch MP4 details' });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
