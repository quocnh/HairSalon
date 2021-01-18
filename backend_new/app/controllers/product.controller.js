
/*jshint esversion: 6 */
const Product = require('../models/product.model');

var express = require('express');
var productRouter = express.Router();
//var Promise = require('bluebird');
var fs = require('fs');
//Promise.promisifyAll(fs);

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

// Get all products from distributorId
productRouter.get('/distributor-category/:distributorId/:category', (req, res) => {
    Product.find({ 
        _distributorId: req.params.distributorId,
        category: req.params.category
    })
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

productRouter.post('/', upload.array('newPhotos[]', 6), (req, res) => {
    var strPhotoPath = Array(6);    
    for (i = 0; i < 6; i++){
        strPhotoPath[i] = "uploads/products/no_image.jpg";
    }

    if(req.files.length > 0){
        console.log(req.files);
        strPhotoPath[0] = req.files[0].path;
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
        category: req.body.category,
        _distributorName: req.body._distributorName,
        unit: req.body.unit,
        brand: req.body.brand,
        photos: strPhotoPath,

    });
    
    product.save()
    .then(savedProduct => res.send(savedProduct))
    .catch((error) => console.log(error));
});

productRouter.patch('/:productId', upload.array('newPhotos[]', 6), (req, res) => {
    var strPhotoPath = Array(6);
    var fs = require('fs');
    
    for (i = 0; i < strPhotoPath.length; i++){
        if(req.body.photos[i] !== 'null') {
            strPhotoPath[i] = req.body.photos[i];
            //console.log(i + ': ' + req.body.photos[i]);
        } else {
            strPhotoPath[i] = 'null';            
        }
        if (req.body.deletedPhotoList[i] === '1') {
            // need to defind index as a const
            const index = i;
            //console.log('Xoa pphoto: ' + index);
            //console.log(req.body.photos[index]);
            strPhotoPath[index] = 'null';
            
            ////delete old file avatar
            fs.exists(req.body.photos[index], function(exists) {
                if(exists) {
                    fs.unlink(req.body.photos[index], (err) => {
                        if (err) throw err;
                        console.log(req.body.photos[index] + ' was deleted.');
                    });                    
                }
            });
        }
    }
    //strPhotoPath = req.body.photos;
    console.log('===>');
    console.log(strPhotoPath);

    if(req.files.length > 0){
        var strPhotoPath = Array(10);
        // update photos
        // console.log(req.files.length);
        // console.log(req.body);
        for (i = 0; i < strPhotoPath.length; i++){
            strPhotoPath[i] = req.body.photos[i];
        } 
        // console.log(strPhotoPath);

        for (i = 0; i < req.files.length; i++)
        {
            if (req.files[i].path) {
                const index = req.body.index[i];
                strPhotoPath[index] = req.files[i].path;    
                //console.log(i + ': ' + index);
                //console.log(req.body.photos);

                ////delete old file avatar
                fs.exists(req.body.photos[index], function(exists) {
                    if(exists) {
                        fs.unlink(req.body.photos[index], (err) => {
                            if (err) throw err;
                            console.log(req.body.photos[index] + ' was deleted.');
                        });
                    }
                });
            }  
        }
    }

    Product.findOneAndUpdate({ '_id': req.params.productId}, 
    {
        $set: 
        { 
            name : req.body.name,
            info: req.body.info,
            _distributorId: req.body._distributorId,
            price: req.body.price,
            quantity: req.body.quantity,      
            event: req.body.event,
            discount: req.body.discount,
            category: req.body.category,
            _distributorName: req.body._distributorName,
            unit: req.body.unit,
            brand: req.body.brand,
            photos: strPhotoPath
        },
    },
    {new: true})
    .then(product => {
        console.log('After modified: '+ product.photos);
        res.send(product);
    })
    .catch((error) => console.log(error));
        
    
    /*
    var strPhotoPath = Array(6);
    //var fs = require('fs');
    
    console.log("===>");
    console.log(req.body.photos);
    console.log("<===");
    for (i = 0; i < strPhotoPath.length; i++){
        strPhotoPath[i] = req.body.photos[i];
    } 
    console.log(strPhotoPath);
    //strPhotoPath[0]="uploads/products/no_photo_available.png";
    if(req.files.length > 0){        
        // update photos
        console.log(req.files.length);        
        
        
        for (i = 0; i < req.files.length; i++)
        {
            if (req.files[i].path) {
                var index = req.body.index[i];
                strPhotoPath[index] = req.files[i].path;    
                console.log(index + ': ' + strPhotoPath[index]);

               // fs.exists(req.body.photos[index], function(exists) {
                    //if(exists) {
                        fs.unlink(req.body.photos[index], (err) => {
                            //if (err) throw err;
                            console.log(req.body.photos[index] + ' was deleted.');
                        });
                    //}
               // });                
                  
            }  
        }        
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
                    discount: req.body.discount,
                    category: req.body.category,
                    _distributorName: req.body._distributorName,
                    unit: req.body.unit,
                    photos: strPhotoPath
                },
            },
            {new: true})
            .then(product => {
                console.log('After modified: '+ product);
                res.send(product);
            })
            .catch((error) => console.log(error));        
    }
*/
});

productRouter.delete('/:productId', (req, res) => {
    console.log('Delete ' + req.params.productId);
    Product.findByIdAndDelete(req.params.productId)
        .then(product => res.send(product))
        .catch((error) => console.log(error));
});

module.exports = productRouter;