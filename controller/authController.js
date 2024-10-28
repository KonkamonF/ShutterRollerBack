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

exports.getUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const getUser = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        address: true,
        lineId: true,
        role: true,
      },
    });
    res.json({ getUser });
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

exports.editProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
    } = req.body;
    const updateProfile = await prisma.user.update({
      where: {
        id: +id,
      },
      data: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: address,
      },
    });
    res.json({ updateProfile });
  } catch (err) {
    next(err);
  }
};
