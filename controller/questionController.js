const errorChecker = require("../utils/errorChecker");
const prisma = require("../config/prismaConfig");
const cloudinary = require("../config/cloudinary");
const path = require("path");
const fs = require("fs");
const { createQuestion } = require("../utils/validator");

exports.imageQuestion = async (req, res, next) => {
  try {
    const checkFile = !!req.file;
    let uploadImage = {};

    if (checkFile) {
      uploadImage = await cloudinary.uploader.upload(req.file.path, {
        overwrite: true,
        public_id: path.parse(req.file.path).name,
      });
    }
    // const validatedData = await createQuestion.validateAsync(req.body);
    const data = {
      name: req.body.title,
      text: req.body.detail,
      userId: req.user.id,
      questionImg: uploadImage?.url ? uploadImage.url : null,
    };
    const result = await prisma.question.create({
      data,
    });

    res.json({ msg: "upload image", data });
  } catch (err) {
    next(err);
  } 
  finally {
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

exports.removeQuestion = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const questionRemove = await prisma.question.delete({
      where: {
        id: +questionId,
      },
    });
    res.json({ msg: "deleted", questionRemove });
  } catch (err) {
    next(err);
  }
};

exports.allQuestion = async (req, res, next) => {
  try {
    const totalQuestion = await prisma.question.findMany({
      include: {
        user: true,
      },
    });
    res.json({ totalQuestion });
  } catch (err) {
    next(err);
  }
};

exports.getQuestion = async (req, res, next) => {
  try {
    const id = req.params.questionId;
    const getQuestion = await prisma.question.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
        name: true,
        text: true,
        questionImg: true,
      },
    });
    res.json({ getQuestion });
  } catch (err) {
    next(err);
  }
};

exports.answerQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;
    const answers = await prisma.question.update({
      where: {
        id: +id,
      },
      data: {
        answer: answer,
      },
    });
    res.json({ answers });
  } catch (err) {
    next(err);
  }
};
