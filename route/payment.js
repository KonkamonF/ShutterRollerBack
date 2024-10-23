const express = require("express")
const paymentController = require("../controller/paymentContoller")
const { upload } = require("../middleware/upload")
const paymentRoute = express.Router()

paymentRoute.post("/createPayment",upload.single("paymentImg"),paymentController.createPayment)
paymentRoute.get("/all",paymentController.findPayment)
paymentRoute.get("/paid/:id",paymentController.getPayment)
paymentRoute.patch("/update/:id",paymentController.updateStatus)


module.exports = paymentRoute