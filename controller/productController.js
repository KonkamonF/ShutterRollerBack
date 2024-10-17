const errorChecker = require("../utils/errorChecker");
const prisma = require("../config/prismaConfig");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createRecord = async (req, res, next) => {
  try {
    const { name, color, weight, high, userId,type } = req.body;
    const response = await prisma.productRecord.create({
      data: {
        name,
        high: high,
        weight: weight,
        userId: +userId,
        color:color,
        type : type
      },
    });
    res.json({ msg: "product record", response });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.findRecord = async (req, res, next) => {
  try {
    const allProduct = await prisma.productRecord.findMany({
      include: {
        user: true,
        Payment: true,
      },
    });
    res.json({ allProduct });
  } catch (err) {
    next(err);
  }
};

exports.editedRecord = async (req, res, next) => {
  try {
    const {recordId} = req.params
    const { name , color , high ,weight , type } = req.body
    const recordEdited = await prisma.productRecord.update({
      where : {
        id : +recordId
      },
      data :{
        name : name,
        color : color,
        high : high,
        weight : weight,
        type : type
      }
    })
    res.json({msg : "edited" , recordEdited})
  } catch (err) {
    next(err);
  }
};

exports.removeRecord = async (req, res, next) => {
  try {
    const { recordId } = req.params;
    console.log(recordId);
    const recordRemove = await prisma.productRecord.delete({
      where: {
        id: Number(recordId),
      },
    });
    res.json({ msg: "deleted", recordRemove });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
