import express from 'express';
import { tranEmployeeController } from '../../controllers/tranEmployeeController.js';
import { jwtMiddleware } from '../../middlewares/jwtMiddleware.js'
import { roleMiddleware } from '../../middlewares/roleMiddleware.js'

const Router = express.Router()

// Router.use( jwtMiddleware.verifyToken )
//, roleMiddleware('tran_employee')
//, roleMiddleware('tran_employee')

Router.post('/order', tranEmployeeController.createOrder)

Router.patch('/update/:id', tranEmployeeController.updateOrder)

export const tranEmployeeRoutes = Router