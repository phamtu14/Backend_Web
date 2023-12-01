import express from 'express'
import { authController } from '../../controllers/authController.js'
import { tranManagerController } from '../../controllers/tranManagerController.js'
import { jwtMiddleware } from '../../middlewares/jwtMiddleware.js'
import { roleMiddleware } from '../../middlewares/roleMiddleware.js'

const Router = express.Router()

Router.use( jwtMiddleware.verifyToken )

Router.post('/register', roleMiddleware('tran_manager'), authController.createEmployee)

Router.delete('/manage/:id', roleMiddleware('tran_manager'), tranManagerController.deleteEmployee)

export const tranManagerRoutes = Router