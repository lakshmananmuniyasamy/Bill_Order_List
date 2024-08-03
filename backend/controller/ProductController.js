const Product = require('../model/Product')

exports.set =async(req,res)=>{
    const { id, productName, quantity, price,coupon,grandTotal,totalAfterCoupon } = req.body;
    const total = quantity * price; 
    const newProduct = new Product({ ord_id: id, productName, quantity, price, total,coupon,grandTotal,totalAfterCoupon });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct); 
    } catch (error) {
        res.status(400).json({ message: 'Error creating product' });
    }
}

exports.get = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getById = async (req, res) => {
    const { id } = req.params; 

    try {
        const product = await Product.find({ord_id:id}); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product); 
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.remove = async (req, res) => {
    const { ord_id } = req.params; 
    try {
        const result = await Product.deleteMany({ ord_id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Product not found' }); 
        }
        res.status(204).json({ message: 'Products deleted' }); 
    } catch (error) {
        console.error('Error deleting products:', error);
        res.status(400).json({ message: 'Error deleting products' });
    }
}