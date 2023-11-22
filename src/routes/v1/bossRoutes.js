import express from 'express'
import { bossController } from '../../controllers/bossController.js'
import { jwtMiddleware } from '../../middlewares/jwtMiddleware.js'
import { roleMiddleware } from '../../middlewares/roleMiddleware.js'
// , roleMiddleware('boss')

const Router = express.Router()

// Router.use( jwtMiddleware.verifyToken )

Router.get('/manage', bossController.getAllEmployees)

Router.delete('/manage/:id', bossController.deleteEmployee)

Router.post('/place', bossController.createPlace)

Router.get('/place', bossController.getAllPlaces)

export const bossRoutes = Router