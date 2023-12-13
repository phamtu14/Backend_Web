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

Router.delete('/manage/:id',gatherManagerController.deleteEmployee )

Router.get('/all', gatherManagerController.getALlEmployees)

export const gatherManagerRoutes = Router