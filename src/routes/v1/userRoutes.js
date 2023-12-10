import express from 'express'
import { userController } from '../../controllers/userController.js'
import { jwtMiddleware } from '../../middlewares/jwtMiddleware.js'
import { roleMiddleware } from '../../middlewares/roleMiddleware.js'

const Router = express.Router()

// Router.use( jwtMiddleware.verifyToken )
// , roleMiddleware('user')
// , roleMiddleware('user')

Router.get('/send', userController.getAllSendOrders)

Router.get('/receive', userController.getAllReceiveOrders)

export const userRoutes = Router