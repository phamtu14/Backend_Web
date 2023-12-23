import express from 'express';
import { tranEmployeeController } from '../../controllers/tranEmployeeController.js';
import { jwtMiddleware } from '../../middlewares/jwtMiddleware.js'
import { roleMiddleware } from '../../middlewares/roleMiddleware.js'
import checkId from '../../middlewares/checkId.js'

const Router = express.Router()

Router.use( jwtMiddleware.verifyToken )
//, roleMiddleware('tran_employee')
//, roleMiddleware('tran_employee'

// tạo mới đơn hàng của người gửi và thêm vào database
Router.post('/order', tranEmployeeController.createOrder)

//cập nhật trạng thái của đơn hàng
// Router.patch('/update/:id', tranEmployeeController.updateOrder)

//lấy tất cả đơn hàng để gửi tới điểm tập kết
Router.get('/allOutOrders', checkId, tranEmployeeController.allOrdersToGather)

//gửi những đơn hàng đã lấy tới điểm tập kết
Router.post('/toGather', tranEmployeeController.toGatherPlace)

//lấy tất cả đơn hàng từ điểm tập kết gửi về
Router.get('/allInOrders', checkId, tranEmployeeController.allOrdersRecGather)

//nhập những đơn hàng được nhận từ điểm tập kết vào kho
Router.post('/recGather', tranEmployeeController.recGatherPlace)

// lấy tất cả hàng gửi cho người nhận
Router.get('/allToUser', tranEmployeeController.allToUser)

// Gửi hàng tới người nhận
Router.post('/toUser', tranEmployeeController.toUser)


//thống kê hàng gửi thành công, hàng gửi không thành công (2 trạng thái success hoặc failed)
Router.get('/statistical', tranEmployeeController.statistical)


export const tranEmployeeRoutes = Router