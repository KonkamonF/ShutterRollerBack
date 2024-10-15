const express = require("express")
const questionController = require("../controller/questionController")
const questionRoute = express.Router()
const multer = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')

questionRoute.post('/userQuestion',authenticate,multer.single("image"),questionController.imageQuestion)

module.exports = questionRoute