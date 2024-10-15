const errorChecker = require("../utils/errorChecker");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prismaConfig");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer")) {
      return errorChecker(401, "Unauthorized");
    }
    const token = authorization.split(" ")[1];
    const payLoad = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findFirst({
      where: {
        id: payLoad.id,
      },
    });
    req.user = user;
    console.log(user);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
