const errorChecker = require("../utils/errorChecker");
const prisma = require("../config/prismaConfig");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorChecker(400, "PLEASE INPUT EMAIL AND PASSWORD");
    }
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    const mathPassword = await bcryptjs.compare(password, user.password);
    if (!mathPassword) {
      return errorChecker(400, "PASSWORD IS NOT MATCH");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ msg: "login", token, role: user.role, user });
    console.log(user);
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phone,
      address,
    } = req.body;
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName ||
      !phone ||
      !address
    ) {
      return errorChecker(400, "PLEASE FILL ALL DATA");
    }
    if (password !== confirmPassword) {
      return errorChecker(400, "PASSWORD AND CONFIRM-PASSWORD MUST BE SAME");
    }

    const checkEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    console.log(checkEmail);
    if (checkEmail) {
      return errorChecker(400, "EMAIL IS USED");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const register = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        address,
        email,
        password: hashedPassword,
      },
    });
    res.json({ msg: "registered", register });
  } catch (err) {
    next(err);
  }
};

exports.findUser = async (req, res, next) => {
  try {
    const allUser = await prisma.user.findMany();
    res.json({ allUser });
  } catch (err) {
    next(err);
  }
};
