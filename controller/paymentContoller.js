const errorChecker = require("../utils/errorChecker");
const prisma = require("../config/prismaConfig");
const cloudinary = require("../config/cloudinary");
const path = require("path");
const fs = require("fs");

exports.createPayment = async (req, res, next) => {
  try {
    const checkFile = !!req.file;
    console.log("checkFile", checkFile);
    let uploadImage = {};
    if (checkFile) {
      uploadImage = await cloudinary.uploader.upload(req.file.path, {
        overwrite: true,
        public_id: path.parse(req.file.path).name,
      });
    }
    const data = {
      productId: +req.body.productId,
      paymentImg: uploadImage?.url ? uploadImage.url : null,
    };
    await prisma.payment.create({
      data,
    });
    res.json({ msg: "PAID", data });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log("upload image Error on deleted picture");
        } else {
          console.log("deleted Successfully");
        }
      });
    }
  }
};

exports.findPayment = async (req, res, next) => {
  try {
    const allPaid = await prisma.payment.findMany({
      select: {
        id: true,
        statusPayment: true,
        paymentImg: true,
        productId: true,
        productRecord: {
          select: {
            userId: true,
            name: true,
            color: true,
            high: true,
            weight: true,
            type: true,
            price: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                address: true,
              },
            },
          },
        },
      },
    });
    res.json({ allPaid });
  } catch (err) {
    next(err);
  }
};

exports.getPayment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const getPaid = await prisma.payment.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
        productId: true,
        paymentImg: true,
        statusPayment: true,
      },
    });
    res.json({ getPaid });
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { statusPayment } = req.body;
    const updatedStatus = await prisma.payment.update({
      where: {
        id: +id,
      },
      data: {
        statusPayment: statusPayment,
      },
    });
    res.json({ updatedStatus });
  } catch (err) {
    next(err);
  }
};
