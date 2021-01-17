
/*jshint esversion: 6 */
const Product = require('../models/product.model');

var express = require('express');
var productOrderRouter = express.Router();
//var Promise = require('bluebird');
var fs = require('fs');
//Promise.promisifyAll(fs);

const multer = require('multer');
const ProductOrder = require('../models/productOrder.model');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/products/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '_' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if ((file.mimetype === 'image/jpeg') || (file.mimetype === 'image/png') || (file.mimetype === 'image/jpg')) {
        cb(null, true);
    } else {
        cb(new Error('File extention is not supported ' + file.mimetype), false);
    }
};
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});

// Get all Order
productOrderRouter.get('/', (req, res) => {
    ProductOrder.find({})
        .then(pOrders => res.send(pOrders))
        .catch((error) => console.log(error));
});

// Get all order from distributorId
productOrderRouter.get('/distributor/:distributorId', (req, res) => {
    ProductOrder.find({ _distributorId: req.params.distributorId})
        .then(pOrders => res.send(pOrders))
        .catch((error) => console.log(error));
        
});

// Get all order from SalonOwnerId
productOrderRouter.get('/salonOwner/:salonOwnerId', (req, res) => {
    // console.log(req.params.productId);
    ProductOrder.find({ _salonOwnerId: req.params.salonOwnerId})
        .then(pOrders => res.send(pOrders))
        .catch((error) => console.log(error));
        
});

productOrderRouter.post('/', upload.array('newPhotos[]', 1), (req, res) => {
    
    console.log(req.body);
    const pOrder = new ProductOrder({
        _salonOwnerId : req.body._salonOwnerId,
        _productId: req.body._productId,
        _distributorId: req.body._distributorId,
        quantity: req.body.quantity,
        info: req.body.info,
        totalPrice: req.body.totalPrice,
        paidAmount: req.body.paidAmount,
        event: req.body.event,
        discount: req.body.discount,
        expectedDeliveryDate: req.body.expectedDeliveryDate,
        paymentType: req.body.paymentType,
        status: req.body.status,

    });
    
    pOrder.save()
    .then(savedpOrder => res.send(savedpOrder))
    .catch((error) => console.log(error));
});

productOrderRouter.patch('/:productOrderId', upload.array('newPhotos[]', 1), (req, res) => {

    ProductOrder.findOneAndUpdate({ '_id': req.params.productOrderId}, 
    {
        $set: 
        { 
            _salonOwnerId : req.body._salonOwnerId,
            _productId: req.body._productId,
            _distributorId: req.body._distributorId,
            quantity: req.body.quantity,
            info: req.body.info,
            totalPrice: req.body.totalPrice,
            paidAmount: req.body.paidAmount,
            event: req.body.event,
            discount: req.body.discount,
            expectedDeliveryDate: req.body.expectedDeliveryDate,
            paymentType: req.body.paymentType,
            status: req.body.status,
        },
    },
    {new: true})
    .then(pOrder => {        
        res.send(pOrder);
    })
    .catch((error) => console.log(error));
        
});

productOrderRouter.delete('/:productOrderId', (req, res) => {
    console.log('Delete ' + req.params.productOrderId);
    Product.findByIdAndDelete(req.params.productOrderId)
        .then(pOrder => res.send(pOrder))
        .catch((error) => console.log(error));
});

module.exports = productOrderRouter;