const express = require("express")
const questionController = require("../controller/questionController")
const questionRoute = express.Router()
const {upload} = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')

questionRoute.post('/userQuestion',authenticate,upload.single("questionImg"),questionController.imageQuestion)
questionRoute.delete('/deleted/:questionId',authenticate,questionController.removeQuestion)
questionRoute.get("/all",authenticate,questionController.allQuestion)
questionRoute.get("/some",authenticate,questionController.getQuestion)

module.exports = questionRoute