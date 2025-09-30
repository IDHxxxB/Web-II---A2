const express = require('express'); // Web framework, used for building APIs
const cors = require('cors'); // Allow front-end access to the API
const db = require('./event_db'); // Import the database for connection

// Create Express application
const app = express();
// Define server port
const port = process.env.PORT || 3000;

// Application Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 1. Home page API endpoint
app.get('/api/events', (req, res) => {
    // Get the activities that occur after the current date and where is_active is true
    const query = `
        SELECT e.*, c.name AS category_name 
        FROM events e 
        JOIN categories c ON e.category_id = c.id 
        WHERE e.event_date >= CURDATE() AND e.is_active = TRUE 
        ORDER BY e.event_date ASC
    `;
    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to get the list of activities' });
        } else {
            res.json(results);
        }
    });
});

// 2. Search function API endpoint
app.get('/api/events/search', (req, res) => {
    let { category, location, date } = req.query;
    let query = `
        SELECT e.*, c.name AS category_name 
        FROM events e 
        JOIN categories c ON e.category_id = c.id 
        WHERE e.is_active = TRUE
    `;
    let queryParams = [];

    // Build SQL queries dynamically based on the provided conditions
    if (category && category !== 'all') {
        query += ` AND c.name = ?`;
        queryParams.push(category);
    }
    if (location) {
        query += ` AND e.location LIKE ?`;
        queryParams.push(`%${location}%`);
    }
    if (date) {
        query += ` AND e.event_date = ?`;
        queryParams.push(date);
    }

    // Execute the query
    db.query(query, queryParams, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Search activity failed' });
        } else {
            res.json(results);
        }
    });
});

// 3. Obtain all categories (for the dropdown box on the search page)
app.get('/api/categories', (req, res) => {
    const query = 'SELECT * FROM categories';
    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to obtain all categories' });
        } else {
            res.json(results);
        }
    });
});

// 4. Activity Details Page API Endpoint
app.get('/api/events/:id', (req, res) => {
    const eventId = req.params.id;
    const query = `
        SELECT e.*, c.name AS category_name 
        FROM events e 
        JOIN categories c ON e.category_id = c.id 
        WHERE e.id = ?
    `;
    db.query(query, [eventId], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to obtain the details of the activity' });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'The activity was not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Charity event API server has been started:: http://localhost:${port}`);
});