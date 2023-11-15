import express from 'express'
import { bossController } from '../../controllers/bossController.js'

const Router = express.Router()

Router.get('/manage', bossController.getAllEmployees)

Router.delete('/manage/:id', bossController.deleteEmployee)

Router.post('/place', bossController.createPlace)

Router.get('/place', bossController.getAllPlaces)

export const bossRoutes = Router