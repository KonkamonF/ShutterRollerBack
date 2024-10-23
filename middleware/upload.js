const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../upload-picture')),
    filename: (req, file, cb) => {
        const fullFilename = `${Date.now()}_${Math.random() * 1000}${path.extname(file.originalname)}` //ทำให้ชื่อไฟล์ไม่ซ้ำกัน //path.extคือนามสกุล
        cb(null, fullFilename)
    }
})



 const upload = multer({ storage: storage })
 module.exports = {upload}