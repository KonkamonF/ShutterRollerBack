const express = require('express')
const productController = require('../controller/productController')
const productRoute = express.Router()

productRoute.post("/record",productController.createRecord)
productRoute.get("/product",productController.findRecord)
productRoute.patch("/edited/:recordId",productController.editedRecord)
productRoute.delete("/deleted/:recordId",productController.removeRecord)

module.exports = productRoute