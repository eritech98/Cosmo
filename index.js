import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

const app = express();
// Load environment variables from .env file
dotenv.config();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Route to fetch and display the APOD image
app.get('/', async (req, res) => {
    try {
        // Make the request to NASA's APOD API
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}`);

        // Extract data from the response
        const { title, date, explanation, url, hdurl, copyright } = response.data;

        // Render the data in the EJS view
        res.render('index.ejs', {
            title,
            date,
            explanation,
            imageUrl: url,
            hdImageUrl: hdurl,
            copyright
        });
    } catch (error) {
        console.error('Error fetching APOD data:', error.message);
        res.status(500).send('Error fetching image data from NASA.');
    }
});

// Serve static files from the "public" folder
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
