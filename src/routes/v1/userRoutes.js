import express from 'express'
import { userController } from '../../controllers/userController.js'

const Router = express.Router()

Router.get('/send', userController.getAllSendOrders)

Router.get('/receive', userController.getAllReceiveOrders)

export const userRoutes = Router