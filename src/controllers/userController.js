import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError.js'
import { userService} from '../services/userService.js'

//get all sended orders
const getAllSendOrders = async (req, res, next) => {
  try {
    const userEmail = req.body.email
    const allOrders = await userService.getAllSendOrders(userEmail)
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