import express from 'express'
import { userController } from '../../controllers/userController.js'

const Router = express.Router()

Router.get('/order', userController.getAllOrders)

export const userRoutes = Router