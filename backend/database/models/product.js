/*jshint esversion: 6 */
const mongoose = require('../mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
        minlength: [2, 'product name must be more than 2 chars'],
        maxlength: [100, 'product name must be less than 100 chars']
    },
    _distributorId: {
        type: mongoose.Types.ObjectId,
        require: true
    },  
    info: { 
        type: String , 
        required: [false, 'Product Info ']
    },
    orderList: [{ 
        type: Object , 
        required: [false, 'order history list ']
    }],
    price: { 
        type: Number, 
        required: [false, 'Price from Info ']
    },
    quantity: { 
        type: Number, 
        required: [false, 'so luong san pham trong kho ']
    },    
    photos: [{
        type: String,
        require: [false, 'product images']
    }],
    event: { 
        type: String , 
        required: [false, 'Thong tin event']
    },
    category: { 
        type: String , 
        required: [false, 'Loại sản phẩm'],
        enum: ["duỗi", "uốn", "nhuộm", "gội", "tạo kiểu", "tinh dầu"]
    },
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;