const express = require("express");
const authController = require("../controller/authController");
const authRoute = express.Router();
const {registerValidator,loginValidator} =require('../utils/validator');
const authenticate = require("../middleware/authenticate");
//create validator

authRoute.post("/login",loginValidator, authController.login);
authRoute.post("/register", authController.register);
authRoute.get("/user", authController.findUser);
authRoute.get("/getUser",authenticate,authController.getUser)
authRoute.patch("/edit/:id",authController.editProfile)


module.exports = authRoute;
