const joi = require("joi");
const errorChecker = require("./errorChecker");

const userRegister = joi.object({
  email: joi.string().email({ tlds: false }).required().messages({
    "string.empty": "Email is required",
  }),
  password: joi
    .string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .messages({
      "string.empty": "Password is Required",
      "string.pattern.base":
        "Password must contain a-z A-Z 0-9 and must be at least 6 characters.",
    }),
  confirmPassword: joi.string().required().valid(joi.ref("password")).messages({
    "string.empty": "Confirm Password Required",
    "any.only": "Password and Confirm Password is not match",
  }),
});

const userLogin = joi.object({
  email: joi.string().required().trim().email(),
  password: joi.string().required(),
});

 exports.createQuestion = joi.object({
  title : joi.string().required(),
  detail : joi.string().required()
})

const validateSchema = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    return errorChecker(400, error.details[0].message);
  }
  req.input = value;
  next();
};

exports.registerValidator = validateSchema(userRegister);
exports.loginValidator = validateSchema(userLogin);
