import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { gatherEmployeeService } from '../services/gatherEmployeeService.js'


// lấy tất cả đơn hàng từ điểm giao dịch gửi tới
const allOrderFromTran = async (req, res, next) => {
  try {
    const id = req.headers.placeId
    const allOrders = await gatherEmployeeService.allOrderFromTran(id)
    res.status(StatusCodes.OK).json(allOrders)
    next()
  } catch (error) {
    next( error )
  }
}


// xác nhận đơn hàng từ điểm tập kết gửi tới
const toGather = async(req, res, next) => {
  try {
    const id = req.headers.placeId
    const result = await gatherEmployeeService.toGather(id)
    res.status(StatusCodes.OK).json(result)
    next()
  } catch (error) {
    next( error )
  }
}


// lấy tất cả đơn hàng gửi tới điểm tập kết đích
const allOrderToEnd = async (req, res, next) => {
  try {
    const id = req.headers.placeId
    const allOrders = await gatherEmployeeService.allOrderToEnd(id)
    res.status(StatusCodes.OK).json(allOrders)
    next()
  } catch (error) {
    next( error )
  }
}


// tạo đơn hàng tới điểm tập kết đích
const toEndGather = async (req, res, next) => {
  try {
    const id = req.headers.placeId
    const allOrders = req.body
    if(!id) {
      throw new Error('Invalid id')
    } else if(allOrders.length <0) {
      throw new Error('Need at least one order')
    } else {
      const result = await gatherEmployeeService.toEndGather(id, allOrders)
      res.status(StatusCodes.OK).json(result)
      next()
    }
  } catch (error) {
    next( error )
  }
}

// xác nhận đơn hàng từ điểm tập kết khác gửi tới:
const confirmToEnd = async (req, res, next) => {
  try {
    const id = req.headers.placeId
    const allOrders = await gatherEmployeeService.confirmToEnd(id)
    res.status(StatusCodes.OK).json(allOrders)
    next()
  } catch (error) {
    next( error )
  }
}

const inGather = async(req, res, next) => {
  try {
    const id = req.headers.placeId
    const result = await gatherEmployeeService.inGather(id)
    res.status(StatusCodes.OK).json(result)
    next()
  } catch (error) {
    next( error )
  }
}

// Gửi hàng lại điểm giao dịch đích
const allOrdersToTran = async (req, res, next) => {
  try {
    const id = req.headers.placeId
    const allOrders = await gatherEmployeeService.allOrdersToTran(id)
    res.status(StatusCodes.OK).json(allOrders)
    next()
  } catch (error) {
    next( error)
  }
}

const toTran = async (req, res, next) => {
  try {
    const id = req.headers.placeId
    const allOrders = req.body
    if(!id) {
      throw new Error('Invalid id')
    } else if(allOrders.length <0) {
      throw new Error('Need at least one order')
    } else {
      const result = await gatherEmployeeService.toTran(id, allOrders)
      res.status(StatusCodes.OK).json(result)
      next()
    }
  } catch (error) {
    next( error )
  }
}



export const gatherEmployeeController = {
  toGather,
  allOrderToEnd,
  toEndGather,
  allOrderFromTran,
  confirmToEnd,
  inGather,
  allOrdersToTran,
  toTran
}