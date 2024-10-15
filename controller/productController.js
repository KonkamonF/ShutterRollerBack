const errorChecker = require("../utils/errorChecker");
const prisma = require("../config/prismaConfig");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createRecord = async (req, res, next) => {
  try {
    const { name, color, weight, high, userId } = req.body;
    const response = await prisma.productRecord.create({
      data: {
        name : name ,
        color :color,
        high: high,
        weight: weight,
        userId : +userId
      },
    });
    res.json({ msg: "product record", response });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.editedRecord = async (req,res,next)=>{
    try {
        
    } catch (err) {
        
    }
}

exports.removeRecord = async (req,res,next)=>{
    try {
        
    } catch (err) {
        console.log(err);
        next()
    }
}