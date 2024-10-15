const express = require("express");
const authController = require("../controller/authController");
const authRoute = express.Router();
const {registerValidator,loginValidator} =require('../utils/validator')
//create validator

authRoute.post("/login",loginValidator, authController.login);
authRoute.post("/register", authController.register);
authRoute.get("/user", authController.findUser);

module.exports = authRoute;
