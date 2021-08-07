const Product = require('../model/ProductModel')
const Category = require('../model/CategoryModel')
const { multipleMongooseToObject } = require('../../ultil/mongoose.js')

class ProductController {
    async index(req, res, next) {
        const products = await Product.find({}).populate('category', 'name')
        res.render('product', {
            js: 'product.js',
            products: multipleMongooseToObject(products)
        })
    }

    async create(req, res, next) {
        try {
            const formData = req.body
            if (formData.filepond == '') {
                formData.imageSrc = '/default.jpg'
            }
            if (formData.filepond != '') {
                const image = JSON.parse(formData.filepond)
                const bufferImage = new Buffer.from(image.data, 'base64')
                formData.imageSrc = `data:${image.type};charset=utf-8;base64,${bufferImage.toString('base64')}`
            }
            const product = new Product(formData)
            await product.save()
            res.redirect('/product')
        } catch (e) {
            console.log(e)
        }
    }

    async edit(req, res, next) {
        try {
            const { id } = req.params
            const formData = req.body
            if (formData.filepond == '') {
                formData.imageSrc = '/default.jpg'
            }
            if (formData.filepond != '') {
                const image = JSON.parse(formData.filepond)
                const bufferImage = new Buffer.from(image.data, 'base64')
                formData.imageSrc = `data:${image.type};charset=utf-8;base64,${bufferImage.toString('base64')}`
            }
            await Product.findOneAndUpdate({ _id: id }, formData)
            res.redirect('/product')
        } catch {

        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await Product.deleteOne({ _id: id })
            res.send({ status: true })
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new ProductController