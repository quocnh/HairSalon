/*jshint esversion: 6 */
const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
/*
localhost:3000 - backend api
localhost:4200 - frontent 
*/
const Customer = require('./database/models/customer');
const Distributor = require('./database/models/distributor');
const Item = require('./database/models/item');
const Salon = require('./database/models/salon');
const SalonOwner = require('./database/models/salonOwner');
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*
Create, Update, ReadOne, ReadAll, Delete
*/
app.get('/salonOwners', (req, res) => {
    SalonOwner.find({})
        .then(salonOwners => res.send(salonOwners))
        .catch((error) => console.log(error));
});

app.post('/salonOwners', (req, res) => {
    (new SalonOwner({ 'name': req.body.name}))
    .save()
    .then(salonOwners => res.send(salonOwners))
    .catch((error) => console.log(error));
});

app.get('/salonOwners/:salonOwnerId', (req, res) => {
    SalonOwner.find({ _id: req.params.salonOwnerId})
        .then(salonOwners => res.send(salonOwners))
        .catch((error) => console.log(error));
});

app.patch('/salonOwners/:salonOwnerId', (req, res) => {
    SalonOwner.findOneAndUpdate({ '_id': req.params.salonOwnerId}, {$set: req.body})
        .then(salonOwners => res.send(salonOwners))
        .catch((error) => console.log(error));
});

app.delete('/salonOwners/:salonOwnerId', (req, res) => {
    SalonOwner.findByIdAndDelete(req.params.salonOwnerId)
        .then(salonOwner => res.send(salonOwner))
        .catch((error) => console.log(error));
});

/* http:/localhost:3000/salonOwners/:salonOwnerId/salons/:salonId */
app.get('/salonOwners/:salonOwnerId/salons', (req, res) => {
    Salon.find({_salonOwnerId: req.params.salonOwnerId})
        .then(salons => res.send(salons))
        .catch((error) => console.log(error));
});

app.post('/salonOwners/:salonOwnerId/salons', (req, res) => {
    (new Salon({ '_salonOwnerId': req.params.salonOwnerId, 'title': req.body.name}))
    .save()
    .then(salons => res.send(salons))
    .catch((error) => console.log(error));
});

app.get('/salonOwners/:salonOwnerId/salons/:salonId', (req, res) => {
    Salon.find({_salonOwnerId: req.params.salonOwnerId, _id:req.params.salonId})
        .then(salons => res.send(salons))
        .catch((error) => console.log(error));
});

app.patch('/salonOwners/:salonOwnerId/salons/:salonId', (req, res) => {
    Salon.findOneAndUpdate({ _salonOwnerId: req.params.salonOwnerId, _id:req.params.salonId}, {$set: req.body})
        .then(salon => res.send(salon))
        .catch((error) => console.log(error));
});

app.delete('/salonOwners/:salonOwnerId/salons/:salonId', (req, res) => {
    Salon.findByIdAndDelete({ _salonOwnerId: req.params.salonOwnerId, _id:req.params.salonId})
        .then(salon => res.send(salon))
        .catch((error) => console.log(error));
});

app.listen(3000, () => console.log("Server Connected on port 3000"));