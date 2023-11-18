import express from 'express'
import { authController } from '../../controllers/authController.js'
import { tranManagerController } from '../../controllers/tranManagerController.js'

const Router = express.Router()

Router.post('/register', authController.createEmployee)

Router.delete('/manage/:id', tranManagerController.deleteEmployee)

export const tranManagerRoutes = Router