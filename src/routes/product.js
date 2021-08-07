const express = require('express')
const router = express.Router()

const productController = require('../app/controllers/ProductController.js')

router.get('/', productController.index)
router.delete('/delete/:id', productController.delete)
router.post('/edit/:id', productController.edit)
router.post('/create', productController.create)


module.exports = router