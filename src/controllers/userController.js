import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError.js'
import jwt from 'jsonwebtoken';
import { userService} from '../services/userService.js'
import { env } from '../config/environment.js'

//get all sended orders
const getAllSendOrders = async (req, res, next) => {
  try {
    const token = req.headers.accesstoken
    const decoded = jwt.verify(token, env.JWT_ACCESS_KEY)
    const allOrders = await userService.getAllSendOrders(decoded.id)
    res.status(StatusCodes.OK).json(allOrders)
    next()
  } catch (error) {
    next( error )
  }
}

//get all received orders
const getAllReceiveOrders = async (req, res, next) => {
  try {
    const userEmail = req.body.email
    const allOrders = await userService.getAllReceiveOrders(userEmail)
    res.status(StatusCodes.OK).json(allOrders)
    next()
  } catch (error) {
    next( error )
  }
}

export const userController = {
  getAllSendOrders,
  getAllReceiveOrders
}