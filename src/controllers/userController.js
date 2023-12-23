import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError.js'
import jwt from 'jsonwebtoken';
import { userService} from '../services/userService.js'
import { env } from '../config/environment.js'

//get all sended orders
const getAllSendOrders = async (req, res, next) => {
  try {
    const senderEmail = req.headers.email
    const allOrders = await userService.getAllSendOrders(senderEmail)
    res.status(StatusCodes.OK).json(allOrders)
    next()
  } catch (error) {
    next( error )
  }
}

//get all received orders
const getAllReceiveOrders = async (req, res, next) => {
  try {
    const receiverEmail = req.headers.email
    const allOrders = await userService.getAllReceiveOrders(receiverEmail)
    res.status(StatusCodes.OK).json(allOrders)
    next()
  } catch (error) {
    next( error )
  }
}

// lấy tất cả đơn hàng được gửi tới
const allOrders = async(req, res, next) => {
  try {
    const receiverEmail = req.headers.email
    const allOrders = await userService.allOrders(receiverEmail)
    res.status(StatusCodes.OK).json(allOrders)
    next()
  } catch (error) {
    next( error )
  }
}


// xác nhận đơn hàng
const acceptOrder = async (req, res, next) => {
  try {
    const orderId = req.body.orderId
    const placeId = req.body.placeId
    const result = await userService.acceptOrder(orderId, placeId)
    res.status(StatusCodes.OK).json(result)
    next()
  } catch (error) {
    next( error )
  }
}

export const userController = {
  getAllSendOrders,
  getAllReceiveOrders,
  acceptOrder,
  allOrders
}