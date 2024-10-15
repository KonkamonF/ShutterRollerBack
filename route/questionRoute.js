const express = require("express")
const questionController = require("../controller/questionController")
const questionRoute = express.Router()

questionRoute.post('/userQuestion',questionController.createQuestion)

module.exports = questionRoute