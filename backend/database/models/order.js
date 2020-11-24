/*jshint esversion: 6 */
const mongoose = require('../mongoose');

const OrderSchema = new mongoose.Schema({
    _salonId: {
        type: mongoose.Types.ObjectId,
        require: [false, 'Salon id']
    },

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
    
    paidAmount: { 
        type: Number , 
        required: [false, 'so tien da tra truoc']
    },

    status: { 
        type: String , 
        required: [false, 'status of order (completed/delivery/waiting for payment)']
    },
});

// get the current timestamp for the booking
OrderSchema.pre('save', async function(next) {

    this.createdDate = new Date().getTime();
    console.log('timestamp: ' + this.createdDate);
    next();
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;