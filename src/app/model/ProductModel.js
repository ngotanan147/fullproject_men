const mongoose = require('mongoose');
const Category = require('./CategoryModel')
const { mongooseToObject } = require('../../ultil/mongoose.js')

const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String, required: true, maxLenght: 255 },
    price: { type: Number, required: true },
    info: { type: String, required: true },
    imageSrc: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category' },
}, {
    timestamps: true
});

// Product.set('toObject', { virtuals: true })
// Product.set('toJSON', { virtuals: true })

// Product.virtual("categoryName").get(async function () {
//     const category = await Category.findOne({ _id: this.category })

//     return mongooseToObject(category).name
// });

module.exports = mongoose.model('Product', Product)