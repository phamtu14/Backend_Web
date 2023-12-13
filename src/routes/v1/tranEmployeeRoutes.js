import express from 'express';
import { tranEmployeeController } from '../../controllers/tranEmployeeController.js';
import { jwtMiddleware } from '../../middlewares/jwtMiddleware.js'
import { roleMiddleware } from '../../middlewares/roleMiddleware.js'
import checkId from '../../middlewares/checkId.js'

const Router = express.Router()

// Router.use( jwtMiddleware.verifyToken )
//, roleMiddleware('tran_employee')
//, roleMiddleware('tran_employee')

Router.post('/order', roleMiddleware('tran_employee'), tranEmployeeController.createOrder)

Router.patch('/update/:id', roleMiddleware('tran_employee'), tranEmployeeController.updateOrder)

Router.get('/allOutOrders', roleMiddleware('tran_employee'), checkId, tranEmployeeController.allOrdersToGather)

Router.post('/toGather', roleMiddleware('tran_employee'), tranEmployeeController.toGatherPlace)

Router.get('/allInOrders', roleMiddleware('tran_employee'), checkId, tranEmployeeController.allOrdersRecGather)

Router.post('/recGather', roleMiddleware('tran_employee'), tranEmployeeController.recGatherPlace)


export const tranEmployeeRoutes = Router