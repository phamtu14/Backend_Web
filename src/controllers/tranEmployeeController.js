import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { tranEmployeeService } from '../services/tranEmployeeService.js'


//nhận đơn hàng của người gửi và trả lại thông tin đơn hàng
const createOrder = async (req, res, next) => {
  try {
    const { name, senderEmail, receiverEmail, tranPlaceId} = req.body
    if( !name || !senderEmail || !receiverEmail || !tranPlaceId) {
      throw new ApiError(StatusCodes.NO_CONTENT, 'Invalid input')
    } else {
      const createdOrder = await tranEmployeeService.createOrder(req.body)
      res.status(StatusCodes.CREATED).json(createdOrder)
    }
  } catch (error) {
    next( error )
  }
}

//trả đơn hàng cho người nhận
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
        res.status( StatusCodes.OK ).json(result)
        next()
      } 
    }
  } catch (error) {
    next( error)
  }
}

// lấy tất cả đơn hàng sẽ gửi tới điểm tập kết
const allOrdersToGather = async (req, res, next) => {
  try {
    const id = req.headers.id
    const allOrders = await tranEmployeeService.allOrdersToGather(id)
    res.status(StatusCodes.OK).json(allOrders)
    next()
  } catch (error) {
    next( error )
  } 
}

// gửi hàng cho bên tập kết 
const toGatherPlace =  async (req, res, next) => {
  try {
    const id = req.headers.id
    const allOrders = req.body
    if(!id) {
      throw new Error('Invalid id')
    } else if(allOrders.length <0) {
      throw new Error('Need at least one order')
    } else {
      const result = await tranEmployeeService.toGatherPlace(id, allOrders)
      res.status(StatusCodes.OK).json(result)
      next()
    }
  } catch (error) {
    next( error )
  }
}

// lay tat ca don hang tu diem tap ket gui ve
const allOrdersRecGather = async (req, res, next) => {
  try {
    const id = req.headers.id
    const allOrders = await tranEmployeeService.allOrdersRecGather(id)
    res.status(StatusCodes.OK).json(allOrders)
    next() 
  } catch (error) {
    next( error )
  }
}

// nhận hàng từ điểm tập kết gần nhất
const recGatherPlace = async (req, res, next) => {
  try {
      const id = req.headers.id
      const result = await tranEmployeeService.recGatherPlace(id)
      res.status(StatusCodes.OK).json(result)
      next()
  } catch (error) {
    next( error )
  }
}


//ghi nhận đơn hàng từ điểm tập kết về

export const tranEmployeeController = {
  createOrder,
  updateOrder,
  toGatherPlace,
  allOrdersToGather,
  recGatherPlace,
  allOrdersRecGather
}