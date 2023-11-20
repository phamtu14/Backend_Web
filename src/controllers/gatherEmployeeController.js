import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { gatherEmployeeService } from '../services/gatherEmployeeService.js'

const createOrder = async (req, res, next) => {
  try {
    const { name, senderEmail, receiverEmail, } = req.body
    if( !name || !senderEmail || !receiverEmail) {
      throw new ApiError(StatusCodes.NO_CONTENT, 'Invalid input')
    } else {
      const createdOrder = await gatherEmployeeService.createOrder(req.body)
      res.status(StatusCodes.CREATED).json(createdOrder)
    }
  } catch (error) {
    next( error )
  }
}

export const gatherEmployeeController = {
  createOrder
}