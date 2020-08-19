/*jshint esversion: 6 */
const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
const salonOwnerRoutes = require('./routes/salonOwner');
const salonRoutes = require('./routes/salon');
const customerRoutes = require('./routes/customer');
const distributorRoutes = require('./routes/distributor');
var bodyParser = require('body-parser');
/*
localhost:3000 - backend api
localhost:4200 - frontent 
*/
const Customer = require('./database/models/customer');
const Distributor = require('./database/models/distributor');
const Item = require('./database/models/item');
const Salon = require('./database/models/salon');
const SalonOwner = require('./database/models/salonOwner');
const customerRouter = require('./routes/customer');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

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

app.listen(3000, () => console.log("Server Connected on port 3000"));