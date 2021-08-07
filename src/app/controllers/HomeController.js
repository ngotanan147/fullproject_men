const Category = require('../model/CategoryModel')
const Product = require('../model/ProductModel')

const { multipleMongooseToObject } = require('../../ultil/mongoose.js')

class CategoryController {
    async index(req, res, next) {
        const products = await Product.find({})
        res.render('home', {
            js: 'home.js',
            products: multipleMongooseToObject(products)
        })
    }

}

module.exports = new CategoryController