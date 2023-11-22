import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { authController } from '../../controllers/authController.js'


const Router = express.Router()

Router.get('/', (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'APIs get user are ready to use'})
  })

Router.post('/register',authController.createUser)

Router.post('/login',authController.login)

export const authRoutes = Router