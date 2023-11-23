import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { tranEmployeeService } from '../services/tranEmployeeService.js'

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

const updateOrder = async (req, res, next) => { 
  try {
    if (!req.params.id) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid id')
    } else {
      const id = req.params.id
      const status = req.body.status
      if(!id || !status) {
        throw new ApiError( StatusCodes.NOT_FOUND, 'Missing id or status')
      } else {
        const result = await tranEmployeeService.updateOrder(id, status)
        res.status( StatusCodes.OK).json(result)
        next()
      } 
    }
  } catch (error) {
    next( error)
  }
}

export const tranEmployeeController = {
  createOrder,
  updateOrder
}