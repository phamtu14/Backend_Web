import express from 'express';
import { tranEmployeeController } from '../../controllers/tranEmployeeController.js';
import { jwtMiddleware } from '../../middlewares/jwtMiddleware.js'
import { roleMiddleware } from '../../middlewares/roleMiddleware.js'

const Router = express.Router()

Router.use( jwtMiddleware.verifyToken )

Router.post('/order', roleMiddleware('tran_employee'), tranEmployeeController.createOrder)

Router.patch('/update/:id', roleMiddleware('tran_employee'), tranEmployeeController.updateOrder)

export const tranEmployeeRoutes = Router