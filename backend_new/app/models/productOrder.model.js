/*jshint esversion: 6 */
const mongoose = require('mongoose');

const ProductOrderSchema = new mongoose.Schema({
    _salonOwnerId: {
        type: mongoose.Types.ObjectId,
        require: [true, 'salon Owner id']
    },

    _distributorId: {
        type: mongoose.Types.ObjectId,
        require: [false, 'Distributor id']
    },

    _productId: {
        type: mongoose.Types.ObjectId,
        require: [false, 'Product id']
    },

    createdDate: { 
        type: Date,
        required: [false, 'Date']
    },

    quantity: { 
        type: Number,
        required: [true, 'Quantity']
    },

    totalPrice: { 
        type: Number , 
        required: [false, 'total price']
    },
    
    event: { 
        type: String , 
        required: [false, 'Thong tin event tặng quà']
    },

    discount: { 
        type: Number , 
        required: [false, 'Giảm giá % (50%)']
    },

    status: { 
        type: String , 
        required: [false, 'status of order (completed/delivery/waiting for payment)']
    },
});

// get the current timestamp for the booking
ProductOrderSchema.pre('save', async function(next) {

    this.createdDate = new Date().getTime();
    console.log('timestamp: ' + this.createdDate);
    next();
});

const ProductOrder = mongoose.model('ProductOrder', ProductOrderSchema);
module.exports = ProductOrder;