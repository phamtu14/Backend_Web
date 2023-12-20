import express from 'express'
import { authController } from '../../controllers/authController.js'
import { gatherManagerController } from '../../controllers/gatherManagerController.js'
import { jwtMiddleware } from '../../middlewares/jwtMiddleware.js'
import { roleMiddleware } from '../../middlewares/roleMiddleware.js'

const Router = express.Router()

// Router.use( jwtMiddleware.verifyToken )
// , roleMiddleware('gather_manager')
// , roleMiddleware('gather_manager')

Router.post('/register', authController.createEmployee)

Router.delete('/manage/:id', roleMiddleware('gather_manager'),gatherManagerController.deleteEmployee )

Router.get('/all', roleMiddleware('gather_manager'), gatherManagerController.getALlEmployees)

// thống kê hàng gửi, hàng nhận tại điểm giao dịch
Router.get('/statistical', gatherManagerController.statistical)

export const gatherManagerRoutes = Router