const mongoose = require('mongoose');
const Product = require('./ProductModel')
const Schema = mongoose.Schema;

const Category = new Schema({
    name: { type: String, required: true, maxLenght: 255 },
}, {
    timestamps: true
});

Category.pre('remove', async function (next) {
    try {
        const products = await Product.find({ category: this._id })
        if (products.length > 0) {
            next(new Error('Không thể xóa!'))
            res.send({ status: false })
        }
    } catch (e) {
        next()
    }
})

module.exports = mongoose.model('Category', Category)