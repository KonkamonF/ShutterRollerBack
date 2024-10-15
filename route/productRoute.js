const express = require('express')
const productController = require('../controller/productController')
const productRoute = express.Router()

productRoute.post("/record",productController.createRecord)

module.exports = productRoute