/*jshint esversion: 6 */
const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
const salonOwnerRoutes = require('./routes/salonOwner');
const salonRoutes = require('./routes/salon');
const customerRoutes = require('./routes/customer');
const distributorRoutes = require('./routes/distributor');
const barberRoutes = require('./routes/barber');
const bookingRoutes = require('./routes/booking');
const cors = require("cors");
var bodyParser = require('body-parser');

/*
localhost:3000 - backend api
localhost:4200 - frontent 
*/


mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*
Create, Update, ReadOne, ReadAll, Delete
*/

app.use('/salonOwners',     salonOwnerRoutes);
app.use('/salons',          salonRoutes);
app.use('/customers',       customerRoutes);
app.use('/distributors',    distributorRoutes);
app.use('/barbers',         barberRoutes);
app.use('/bookings',        bookingRoutes);


app.listen(3000, () => console.log("Server Connected on port 3000"));