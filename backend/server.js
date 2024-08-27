const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDb = require('./Config/databaseConnect');
const authRoute = require('./Routes/authRoute');
const messageRoute = require('./Routes/messageRoute');
const userRoute = require('./Routes/userRoute');
const { app, server } = require('./socket/socket');

// Environment variables
require('dotenv').config();

// Port configuration
const PORT = process.env.PORT || 4000;

// Initialize express app
app.use(express.json());
app.use(cookieParser());

// Uncomment and configure CORS if needed
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// API Routes
app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/users', userRoute);

// Serve static files from 'frontend/dist'
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Handle all other routes by serving the main HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start server and connect to database
server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
    connectDb();
});
