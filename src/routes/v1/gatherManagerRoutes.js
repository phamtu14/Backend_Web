import express from 'express'
import { authController } from '../../controllers/authController.js'
import { gatherManagerController } from '../../controllers/gatherManagerController.js'
import { jwtMiddleware } from '../../middlewares/jwtMiddleware.js'
import { roleMiddleware } from '../../middlewares/roleMiddleware.js'

const Router = express.Router()

Router.use( jwtMiddleware.verifyToken )

Router.post('/register', roleMiddleware('gather_manager'), authController.createEmployee)

Router.delete('/manage/:id', roleMiddleware('gather_manager'),gatherManagerController.deleteEmployee )

export const gatherManagerRoutes = Router