import express from 'express';
import { gatherEmployeeController } from '../../controllers/gatherEmployeeController.js';

const Router = express.Router()

Router.post('/order', gatherEmployeeController.createOrder)

export const gatherEmployeeRoutes = Router