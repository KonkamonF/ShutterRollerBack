const express = require("express")
const paymentRoute = express.Router()


paymentRoute.post("/createPayment")

module.exports = paymentRoute