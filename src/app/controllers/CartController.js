const Cart = require('../model/CartModel')
const Product = require('../model/ProductModel')
const { multipleMongooseToObject } = require('../../ultil/mongoose.js')

class CartController {
    async index(req, res, next) {
        res.render('cart', {
            js: 'cart.js',
        })
    }

    async getCart(req, res, next) {
        res.send({ data: req.session.cart })
    }

    async addToCart(req, res, next) {
        try {
            const { id } = req.params
            const product = await Product.findOne({ _id: id })
            if (req.session.cart === undefined) {
                req.session.cart = []
            }
            const cart = new Cart(req.session.cart)
            cart.add(product)
            req.session.cart = cart.items
            res.send({ status: true })
        } catch (e) {
            console.log(e)
        }
    }

    async increase(req, res, next) {
        try {
            const { id } = req.params
            const cart = new Cart(req.session.cart)
            const remainQuantity = cart.increase(id)
            req.session.cart = cart.items
            console.log(remainQuantity)
            res.send({ data: remainQuantity, id: id })

        } catch (e) {
            console.log(e)
        }
    }

    async decrease(req, res, next) {
        try {
            const { id } = req.params
            const cart = new Cart(req.session.cart)
            const remainQuantity = cart.decrease(id)
            console.log(remainQuantity)
            req.session.cart = cart.items
            res.send({ data: remainQuantity, id: id })
        } catch {

        }
    }

    async getTotalPrice(req, res, next) {
        try {
            const cart = new Cart(req.session.cart)
            const totalPrice = cart.getTotalPrice()
            res.send({ data: totalPrice })
        } catch (e) {
            console.log(e)
        }
    }

    async getTotalPriceById(req, res, next) {
        try {
            const { id } = req.params
            const cart = new Cart(req.session.cart)
            const totalPrice = cart.getTotalPriceById(id)
            res.send({ data: totalPrice })
        } catch (e) {
            console.log(e)
        }
    }

    async getTotalQuantity(req, res, next) {
        try {
            const cart = new Cart(req.session.cart)
            const totalQuantity = cart.getTotalQuantity()
            res.send({ data: totalQuantity })
        } catch (e) {
            console.log(e)
        }
    }

    async delete(req, res, next) {
        try {
            const cart = new Cart(req.session.cart)
            cart.delete()
            req.session.cart = cart.items
            res.send({ status: true })
        } catch (e) {
            console.log(e)
        }
    }

    async updateQuantity(req, res, next) {
        try {
            const { id, newQuantity } = req.params
            const cart = new Cart(req.session.cart)
            const quantity = cart.updateQuantity(id, newQuantity)
            console.log(quantity)
            req.session.cart = cart.items
            res.send({ data: quantity })
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new CartController