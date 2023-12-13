import express from 'express'
import { authController } from '../../controllers/authController.js'
import { tranManagerController } from '../../controllers/tranManagerController.js'
import { jwtMiddleware } from '../../middlewares/jwtMiddleware.js'
import { roleMiddleware } from '../../middlewares/roleMiddleware.js'

const Router = express.Router()

// Router.use( jwtMiddleware.verifyToken )
// , roleMiddleware('tran_manager')
// , roleMiddleware('tran_manager')

Router.post('/register', authController.createEmployee)

Router.delete('/manage/:id', tranManagerController.deleteEmployee)

Router.get('/all', tranManagerController.getALlEmployees)

export const tranManagerRoutes = Router