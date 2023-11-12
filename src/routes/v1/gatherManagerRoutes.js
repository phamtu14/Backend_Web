import express from 'express'
import { authController } from '../../controllers/authController.js'

const Router = express.Router()

Router.post('/register', authController.createEmployee)


export const gatherManagerRoutes = Router