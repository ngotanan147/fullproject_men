const express = require('express')
const router = express.Router()

const cartController = require('../app/controllers/CartController.js')

router.get('/', cartController.index)
router.get('/getCart', cartController.getCart)
router.get('/getTotalPrice', cartController.getTotalPrice)
router.get('/getTotalQuantity', cartController.getTotalQuantity)
router.get('/getTotalPriceById/:id', cartController.getTotalPriceById)
router.put('/increase/:id', cartController.increase)
router.put('/decrease/:id', cartController.decrease)
router.put('/updateQuantity/:id/:newQuantity', cartController.updateQuantity)
router.delete('/delete/:id', cartController.delete)
router.post('/addToCart/:id', cartController.addToCart)


module.exports = router