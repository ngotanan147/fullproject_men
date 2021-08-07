const Category = require('../model/CategoryModel')
const { multipleMongooseToObject } = require('../../ultil/mongoose.js')

class CategoryController {
    async index(req, res, next) {
        const category = await Category.find({})
        res.render('category', {
            js: 'category.js',
            category: multipleMongooseToObject(category)
        })
    }

    async create(req, res, next) {
        try {
            const formData = req.body
            const category = new Category(formData)
            await category.save()
            res.send({ status: true, data: category })
        } catch (e) {
            console.log(e)
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const category = await Category.findOne({ _id: id })
            category.remove()
            res.send({ status: true })
        } catch (e) {
            console.log(e)
        }
    }

    async getCategory(req, res, next) {
        try {
            const category = await Category.find({})
            res.send({ data: category })
        } catch {

        }
    }
}

module.exports = new CategoryController