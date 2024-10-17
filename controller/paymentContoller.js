const errorChecker = require("../utils/errorChecker")
const prisma =require("../config/prismaConfig")

exports.createPayment = async (req, res, next) => {
  try {
    const {paymentImg} = req.body
    const response = await prisma.payment.create({
        data : {
            paymentImg
        }
    })
    req.json({ msg : "PAID", response})
  } catch (err) {
    next(err);
  }
};
