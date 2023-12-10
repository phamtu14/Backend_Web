import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { orderTranModel } from '../models/orderTranModel.js'
import { userModel } from '../models/userModel.js'
import { intermediateModel } from '../models/intermediateModel.js'
import mongoose from 'mongoose'


//tạo đơn hàng cho người gửi và trả lại thông tin đơn hàng
const createOrder = async (reqBody) => {
  try {
  let { name, status, dateSend, senderEmail, receiverEmail, tranPlaceId} = reqBody
  status = 'tranPlace'
  dateSend = new Date()
  const isSender = await userModel.findOne({ email: senderEmail })
  const isReceiver = await userModel.findOne({ email: receiverEmail })

  if (!isSender || !isReceiver) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid user")
  } else {
    const createdOrder = await orderTranModel.create( {
      name, 
      status: status,
      dateSend: dateSend,
      senderEmail: senderEmail,
      receiverEmail: receiverEmail,
      tranPlaceId
    })
    return createdOrder
  }
  } catch (error) {
    throw error
  }
}


//trả hàng cho người nhận
const updateOrder = async (id, status) => {
  try {
    let order = await orderTranModel.findOne({ _id: id })
    if (!order) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid order')
    } else {
      let newOrder = await orderTranModel.findOneAndUpdate(
        { _id: id },
        { $set: { status: status } },
        { new: true } 
      )
      return newOrder
    }
  } catch (error) {
    throw error
  }
}

// lấy tất cả đơn hàng sẽ gửi tới điểm tập kết
const allOrdersToGather = async (id) => {
  try {
    // let objectId = new mongoose.Types.ObjectId(id)
    const allOrders = await orderTranModel.find({
      tranPlaceId: id,
      status: 'tranPlace'
    })
    return allOrders
  } catch (error) {
    throw error
  }
}



// tạo đơn hàng gửi tới điểm tập kết
const toGatherPlace = async (orders) => {
  
  try {
    orders.map(order => {
      let status = 'toInter'
      let newOrder = {...order, status}
      intermediateModel.create(newOrder)
    })

    for (let index = 0; index < orders.length; index++) {
      const element = orders[index]
      await orderTranModel.deleteOne({
        _id: element._id,
      })
    }
    
    return 'Thêm thành công'
  } catch (error) {
    throw error
  }
}

export const tranEmployeeService = {
  createOrder,
  updateOrder,
  toGatherPlace,
  allOrdersToGather
}