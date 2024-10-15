const errorChecker = require("../utils/errorChecker")
const prisma = require("../config//prismaConfig")

exports.createQuestion = async (req,res,next)=>{
    try {
        const {name , text ,userId} = req.body
        const response = await prisma.question.create({
            data : {
                name : name,
                text : text,
                userId :+userId
            }
        })
        res.json({ msg : 'created question' , response})
    } catch (err) {
        console.log(err);
        next(err)
    }
}