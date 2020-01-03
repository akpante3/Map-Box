const path = require('path');
const express = require('express');
const dontenv  = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db')

// load env variables

dontenv.config({ path: './config/config.env' });

const app = express()

// body parser
app.use(express.json());

// Connect to database
connectDB()

// Enable cors
app.use(cors()); 

// Routes
app.use('/api/v1/stores', require('./router/store.js'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));