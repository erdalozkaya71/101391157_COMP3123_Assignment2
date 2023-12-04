// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const Joi = require('joi');
// const userRoutes = require('./routes/userRoutes');
// const employeeRoutes = require('./routes/employeeRoutes');
// //const { userData, employeeData } = require('./validation');
// const cors = require('cors')
// const app = express();

// app.use(cors())
// app.use(bodyParser.json());
// app.use(express.urlencoded())

// // User-specific Middleware
// // app.use('/api/v1/user', userData);
// // app.use('/api/v1/emp', employeeData);

// //Connect to the database
// mongoose.connect('mongodb+srv://erdalozkaya:Okan2010@cluster0.wjyh9pu.mongodb.net/?retryWrites=true&w=majority')
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Could not connect to MongoDB', err));

// // const port = 3001
// // const DB_CONNECTION_STRING= "mongodb://erdalozkaya:Okan2010@cluster0.wjyh9pu.mongodb.net/F2023_comp3123?retryWrites=true&w=majority"
// // var database = mongoose.connection
// //     database.on('error', (error) => {
// //         console.log(error)
// //     })
// //     database.once('connected', () => {
// //         console.log('Database connection  successfull')
// //     })

// // Routes
// app.use('/api/v1/emp', employeeRoutes);
// app.use('/api/v1/user', userRoutes);

// // Define a route for the root URL
// app.get('/', (req, res) => {
//     res.send('Welcome to the root URL!');
// });

// const port = process.env.PORT || 3001;
// app.listen(port, () => console.log(`Listening on port ${port}...`));

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const bodyParser = require('body-parser');
const app = express();
const SERVER_PORT = process.env.PORT || 3001;

const cors = require("cors");
app.use(cors());


// Middleware JSON parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded());

mongoose.connect('mongodb+srv://erdalozkaya:Okan2010@cluster0.wjyh9pu.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));



app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", employeeRoutes);

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`);
});




