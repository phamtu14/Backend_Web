import express from 'express';
import { tranEmployeeController } from '../../controllers/tranEmployeeController.js';

const Router = express.Router()

Router.post('/order', tranEmployeeController.createOrder)

Router.patch('/update/:id', tranEmployeeController.updateOrder)

export const tranEmployeeRoutes = Router