import express from 'express'
import { bossController } from '../../controllers/bossController.js'
import { jwtMiddleware } from '../../middlewares/jwtMiddleware.js'
import { roleMiddleware } from '../../middlewares/roleMiddleware.js'

const Router = express.Router()

Router.use( jwtMiddleware.verifyToken )

// lấy ra tất cả quản lý
Router.get('/manage', roleMiddleware('boss'), bossController.getAllEmployees)

// xóa quản lý nào đó
Router.delete('/manage/:id', roleMiddleware('boss'), bossController.deleteEmployee)

// tạo thêm 1 điểm giao dịch hoặc tập kết
Router.post('/place', roleMiddleware('boss'), bossController.createPlace)

// lấy ra tất cả điểm giao dịch hoặc tập kết
Router.get('/place', roleMiddleware('boss'), bossController.getAllPlaces)

// thống kê
Router.get('/statistical', bossController.statistical)

export const bossRoutes = Router