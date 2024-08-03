const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    ord_id: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true,},
    price: { type: Number, required: true, },
    total: { type: Number, required: true, },
    coupon:{type:String},
    grandTotal:{type:Number, require: true},
    totalAfterCoupon:{type: Number,required:true}
}, {
    timestamps: true,
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
