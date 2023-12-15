import express from 'express';
import { tranEmployeeController } from '../../controllers/tranEmployeeController.js';
import { jwtMiddleware } from '../../middlewares/jwtMiddleware.js'
import { roleMiddleware } from '../../middlewares/roleMiddleware.js'
import checkId from '../../middlewares/checkId.js'

const Router = express.Router()

// Router.use( jwtMiddleware.verifyToken )
//, roleMiddleware('tran_employee')
//, roleMiddleware('tran_employee'

Router.post('/order', tranEmployeeController.createOrder)

Router.patch('/update/:id', tranEmployeeController.updateOrder)

Router.get('/allOutOrders', checkId, tranEmployeeController.allOrdersToGather)

Router.post('/toGather', tranEmployeeController.toGatherPlace)

Router.get('/allInOrders', checkId, tranEmployeeController.allOrdersRecGather)

Router.post('/recGather', tranEmployeeController.recGatherPlace)

Router.get('/statistical', tranEmployeeController.statistical)


export const tranEmployeeRoutes = Router