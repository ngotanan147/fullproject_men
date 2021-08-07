const express = require('express')
const router = express.Router()

const categoryController = require('../app/controllers/CategoryController.js')

router.get('/', categoryController.index)
router.get('/getCategory', categoryController.getCategory)
router.post('/create', categoryController.create)
router.delete('/delete/:id', categoryController.delete)

module.exports = router