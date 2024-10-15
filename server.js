require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const authRoute = require('./route/authRoute')
const productRoute =require('./route/productRoute')
const questionRoute =require('./route/questionRoute')
const error = require('./middleware/error')
const pageNotFound = require('./middleware/pageNotFound')
const app = express()
app.use(cors())
app.use(morgan('dev'))
//connext Front to Back
app.use(express.json())

app.use('/auth',authRoute)
app.use('/service',productRoute)
app.use('/question', questionRoute)
// app.use('/admin')

app.use(error)
app.use('*',pageNotFound)

const port = process.env.PORT
app.listen(port,()=>console.log(`Server run on ${port}`))