import express from 'express'
import { authController } from '../../controllers/authController.js'
import { tranManagerController } from '../../controllers/tranManagerController.js'
import { jwtMiddleware } from '../../middlewares/jwtMiddleware.js'
import { roleMiddleware } from '../../middlewares/roleMiddleware.js'

const Router = express.Router()

Router.use( jwtMiddleware.verifyToken )
// , roleMiddleware('tran_manager')
// , roleMiddleware('tran_manager')

// tạo tài khoản cho nhân viên
Router.post('/register', authController.createEmployee)

// xóa tài khoản của nhân viên
Router.delete('/manage/:id', roleMiddleware('tran_manager'), tranManagerController.deleteEmployee)

// lấy tất cả tài khoản của nhân viên mình quản lý
Router.get('/all', roleMiddleware('tran_manager'), tranManagerController.getALlEmployees)

// thống kê hàng gửi, hàng nhận tại điểm giao dịch
Router.get('/statistical', tranManagerController.statistical)



export const tranManagerRoutes = Router