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
      next()
    }
  } catch (error) {
    next( error )
  }
}

// //trả đơn hàng cho người nhận
// const updateOrder = async (req, res, next) => { 
//   try {
//     if (!req.params.id) {
//       throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid id')
//     } else {
//       const placeId = req.headers.placeid
//       const id = req.params.id
//       const status = req.body.status
//       if(!id || !status) {
//         throw new ApiError( StatusCodes.NOT_FOUND, 'Missing id or status')
//       } else {
//         const result = await tranEmployeeService.updateOrder(placeId, id, status)
//         res.status( StatusCodes.OK ).json(result)
//         next()
//       } 
//     }
//   } catch (error) {
//     next( error)
//   }
// }

// lấy tất cả đơn hàng sẽ gửi tới điểm tập kết
const allOrdersToGather = async (req, res, next) => {
  try {
    const placeId = req.headers.placeid
    const allOrders = await tranEmployeeService.allOrdersToGather(placeId)
    res.status(StatusCodes.OK).json(allOrders)
    next()
  } catch (error) {
    next( error )
  } 
}

// gửi hàng cho bên tập kết 
const toGatherPlace =  async (req, res, next) => {
  try {
    const id = req.headers.placeid
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
    const id = req.headers.placeid
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
      const id = req.headers.placeid
      const result = await tranEmployeeService.recGatherPlace(id)
      res.status(StatusCodes.OK).json(result)
      next()
  } catch (error) {
    next( error )
  }
}

// thống kê hàng gửi, nhận, chuyển
const statistical = async (req, res, next) => {
  try {
    const id = req.headers.placeid
    const result = await tranEmployeeService.statistical(id)
    res.status(StatusCodes.OK).json({
      success: result.success,
      failed: result.failed
    })
    next()
  } catch (error) {
    next( error )
  }
}

// lấy tất cả đơn hàng để gửi lại cho người nhận
const allToUser = async (req, res, next) => {
  try {
    const id = req.headers.placeid
    if(!id) {
      throw new ApiError(StatusCodes.NOT_FOUND, "No place id")
    } else {
      const result = await tranEmployeeService.allToUser(id)
      res.status(StatusCodes.OK).json(result)
      next()
    }
  } catch (error) {
    next( error )
  }
}

// gửi hàng tới người nhận
const toUser = async (req, res, next) => {
  try {
    const placeId = req.headers.placeid
    const orderId = req.body.orderId
    console.log(orderId)
    if(!orderId) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Order not found")
    } else {
      const result = await tranEmployeeService.toUser(placeId, orderId)
      res.status(StatusCodes.OK).json(result)
      next()
    }
  } catch (error) {
    next( error)
  }
}


export const tranEmployeeController = {
  createOrder,
  toGatherPlace,
  allOrdersToGather,
  recGatherPlace,
  allOrdersRecGather,
  statistical,
  allToUser,
  toUser
}