import express from 'express'
import { bossController } from '../../controllers/bossController.js'
import { jwtMiddleware } from '../../middlewares/jwtMiddleware.js'
import { roleMiddleware } from '../../middlewares/roleMiddleware.js'

const Router = express.Router()

Router.use( jwtMiddleware.verifyToken )

Router.get('/manage', roleMiddleware('boss'), bossController.getAllEmployees)

Router.delete('/manage/:id', roleMiddleware('boss'), bossController.deleteEmployee)

Router.post('/place', roleMiddleware('boss'), bossController.createPlace)

Router.get('/place', roleMiddleware('boss'), bossController.getAllPlaces)

Router.get('/statistical', bossController.statistical)

export const bossRoutes = Router