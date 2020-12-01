
/*jshint esversion: 6 */
const Product = require('../database/models/product');

var express = require('express');
var productRouter = express.Router();
const multer = require('multer');

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

// Get all Products
productRouter.get('/', (req, res) => {
    Product.find({})
        .then(products => res.send(products))
        .catch((error) => console.log(error));
});

// Get all products from distributorId
productRouter.get('/distributor/:distributorId', (req, res) => {
    Product.find({ _distributorId: req.params.distributorId})
        .then(products => res.send(products))
        .catch((error) => console.log(error));
        
});

// Get product
productRouter.get('/:productId', (req, res) => {
    // console.log(req.params.productId);
    Product.find({ _id: req.params.productId})
        .then(products => res.send(products))
        .catch((error) => console.log(error));
        
});

productRouter.post('/', upload.single('product'), (req, res) => {
    var strPhotoPath = "uploads/products/no_photo_available.png";
    if(req.file){
        console.log(req.file);
        strPhotoPath = req.file.path;
    }
    
    console.log(req.body);
    console.log(req.body.username);
    //var strBody = JSON.parse(JSON.stringify(req.body));
    
    const product = new Product({
        name : req.body.name,
        info: req.body.info,
        _distributorId: req.body._distributorId,
        price: req.body.price,
        quantity: req.body.quantity,
        event: req.body.event,
        photos: strPhotoPath,

    });
    
    product.save()
    .then(savedProduct => res.send(savedProduct))
    .catch((error) => console.log(error));
});

productRouter.patch('/:productId', upload.single('product'), (req, res) => {
    var strPhotoPath = "";
    var fs = require('fs');

    if(req.file){
        strPhotoPath = req.file.path;
        //delete old file avatar
        fs.exists(req.body.photos, function(exists) {
            if(exists) {
                fs.unlink(req.body.photos, (err) => {
                    if (err) throw err;
                    console.log(req.body.photos + ' was deleted.');
                  });
            }
            });
    } else {
        strPhotoPath = req.body.photos;
    }
    
    if (req.body.name) {
        
        console.log(req.body);
        Product.findOneAndUpdate({ '_id': req.params.productId}, 
            {$set: 
                { 
                    name : req.body.name,
                    info: req.body.info,
                    _distributorId: req.body._distributorId,
                    price: req.body.price,
                    quantity: req.body.quantity,      
                    event: req.body.event,
                    photos: strPhotoPath,
                },
            },
            {new: true})
            .then(product => {
                console.log('After modified: '+ product);
                res.send(product);
            })
            .catch((error) => console.log(error));        
    }

});

productRouter.delete('/:productId', (req, res) => {
    console.log('Delete ' + req.params.productId);
    Product.findByIdAndDelete(req.params.productId)
        .then(product => res.send(product))
        .catch((error) => console.log(error));
});

module.exports = productRouter;