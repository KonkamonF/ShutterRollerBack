const errorChecker = require("../utils/errorChecker");
const prisma = require("../config/prismaConfig");
const cloudinary = require("../config/cloudinary");
const path = require("path");
const fs = require("fs");
const { createQuestion } = require("../utils/validator");
const { cachedDataVersionTag } = require("v8");



exports.imageQuestion = async (req, res, next) => {
    try {
        const checkFile = !!req.file;
        let uploadImage = {};
        console.log('file',req.file);
        
        if (checkFile) {
           uploadImage = await cloudinary.uploader.upload(req.file.path, {
                overwrite: true,
                public_id: path.parse(req.file.path).name,
            });
            console.log(uploadImage,"UPLODA");
    //   fs.unlink(req.file.path, (err) => {
    //     if (err) {
    //       console.log("upload image Error on deleted picture");
    //     } else {
    //       console.log("deleted Successfully");
    //     }
    //   });
    }
    const validatedData = await createQuestion.validateAsync(req.body);
    const data = {
      name: req.body.title,
      text: req.body.detail,
      userId: req.user.id,
      questionImg : uploadImage?.url ? uploadImage.url : null
    };
    await prisma.question.create({
        data 
    })
    res.json({ msg : "upload image" , data})
  } catch (err) {
    next(err);
  } finally{
    fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log("upload image Error on deleted picture");
        } else {
          console.log("deleted Successfully");
        }
      });
  }
};
