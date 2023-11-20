import express from 'express'
import { env } from './config/environment.js'
import mongoose from 'mongoose'
import { API } from './routes/v1/index.js'
// import { StatusCodes } from 'http-status-codes'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()


app.use(express.json())
app.use(cors())
app.use(cookieParser())


//use router
app.use('/v1', API)

//middleware xu li loi
app.use(errorHandlingMiddleware)

mongoose.connect(env.MONGODB_URI)
.then( () => {
  app.listen( env.APP_PORT, () => {
    console.log(`Server is running on http://localhost:${env.APP_PORT}`);
  })

  console.log('Connected to MongoDb')
})
.catch( (error) => console.log(error))



