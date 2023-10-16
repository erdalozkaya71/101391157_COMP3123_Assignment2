const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Joi = require('joi');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const { userData, employeeData } = require('./validation');

const app = express();
app.use(bodyParser.json());


// User-specific Middleware
app.use('/api/v1/user', userData);
app.use('/api/v1/emp', employeeData);

//Connect to the database
mongoose.connect('mongodb+srv://erdalozkaya:Okan2010@cluster0.wjyh9pu.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


// const port = 3001
// const DB_CONNECTION_STRING= "mongodb://erdalozkaya:Okan2010@cluster0.wjyh9pu.mongodb.net/F2023_comp3123?retryWrites=true&w=majority"
// var database = mongoose.connection
//     database.on('error', (error) => {
//         console.log(error)
//     })
//     database.once('connected', () => {
//         console.log('Database connection  successfull')
//     })


// Routes
app.use('/api/v1/emp', employeeRoutes);
app.use('/api/v1/user', userRoutes);

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the root URL!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

