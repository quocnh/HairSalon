
/*jshint esversion: 6 */
const SalonOwner = require('../database/models/salonOwner');
const Salon = require('../model');

var express = require('express');
var salonOwnerRouter = express.Router();


salonOwnerRouter.get('/', (req, res) => {
    SalonOwner.find({})
        .then(salonOwners => res.send(salonOwners))
        .catch((error) => console.log(error));
});

salonOwnerRouter.post('/', (req, res) => {
    (new SalonOwner({ 'name': req.body.name}))
    .save()
    .then(salonOwners => res.send(salonOwners))
    .catch((error) => console.log(error));
});

salonOwnerRouter.get('/:salonOwnerId', (req, res) => {
    SalonOwner.find({ _id: req.params.salonOwnerId})
        .then(salonOwner => res.send(salonOwner))
        .catch((error) => console.log(error));
});

salonOwnerRouter.patch('/:salonOwnerId', (req, res) => {
    SalonOwner.findOneAndUpdate({ '_id': req.params.salonOwnerId}, {$set: req.body})
        .then(salonOwner => res.send(salonOwner))
        .catch((error) => console.log(error));
});

salonOwnerRouter.delete('/:salonOwnerId', (req, res) => {
    SalonOwner.findByIdAndDelete(req.params.salonOwnerId)
        .then(salonOwner => res.send(salonOwner))
        .catch((error) => console.log(error));
});

salonOwnerRouter.get('/:salonOwnerId/salons', (req, res) => {
    Salon.find({_salonOwnerId: req.params.salonOwnerId})
        .then(salons => res.send(salons))
        .catch((error) => console.log(error));
});

salonOwnerRouter.get('/:salonOwnerId/salons/:salonId', (req, res) => {
    Salon.find({_salonOwnerId: req.params.salonOwnerId, _id:req.params.salonId})
        .then(salons => res.send(salons))
        .catch((error) => console.log(error));
});

salonOwnerRouter.patch('/:salonOwnerId/salons/:salonId', (req, res) => {
    Salon.findOneAndUpdate({ _salonOwnerId: req.params.salonOwnerId, _id:req.params.salonId}, {$set: req.body})
        .then(salon => res.send(salon))
        .catch((error) => console.log(error));
});

salonOwnerRouter.delete('/:salonOwnerId/salons/:salonId', (req, res) => {
    Salon.findByIdAndDelete({ _salonOwnerId: req.params.salonOwnerId, _id:req.params.salonId})
        .then(salon => res.send(salon))
        .catch((error) => console.log(error));
});

module.exports = salonOwnerRouter;