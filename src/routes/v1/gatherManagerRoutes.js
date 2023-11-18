import express from 'express'
import { authController } from '../../controllers/authController.js'
import { gatherManagerController } from '../../controllers/gatherManagerController.js'

const Router = express.Router()

Router.post('/register', authController.createEmployee)

Router.delete('/manage/:id',gatherManagerController.deleteEmployee )
export const gatherManagerRoutes = Router