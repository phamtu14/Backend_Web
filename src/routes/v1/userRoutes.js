import express from 'express'
import { userController } from '../../controllers/userController.js'
import { jwtMiddleware } from '../../middlewares/jwtMiddleware.js'
import { roleMiddleware } from '../../middlewares/roleMiddleware.js'

const Router = express.Router()

Router.use( jwtMiddleware.verifyToken )

Router.get('/send', roleMiddleware('user'), userController.getAllSendOrders)

Router.get('/receive', roleMiddleware('user'), userController.getAllReceiveOrders)

export const userRoutes = Router