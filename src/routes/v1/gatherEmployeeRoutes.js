import express from 'express';
import { gatherEmployeeController } from '../../controllers/gatherEmployeeController.js';
import { jwtMiddleware } from '../../middlewares/jwtMiddleware.js'
import { roleMiddleware } from '../../middlewares/roleMiddleware.js'
import checkId from '../../middlewares/checkId.js'

const Router = express.Router() 

// lấy tất cả đơn hàng từ từ điểm giao dịch gửi tới
Router.get('/orderFromTran', gatherEmployeeController.allOrderFromTran)

// Nhận hàng từ điểm giao dịch
Router.post('/toGather', gatherEmployeeController.toGather)

// lấy tất cả đơn hàng gửi tới điểm tập kết đích
Router.get('/orderToEnd', gatherEmployeeController.allOrderToEnd) 

//gửi hàng tới điểm giao dịch đích
Router.post('/toEnd', gatherEmployeeController.toEndGather)


export const gatherEmployeeRoutes = Router