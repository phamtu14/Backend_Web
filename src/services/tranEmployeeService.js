import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { orderModel } from '../models/orderModel.js'
import { userModel } from '../models/userModel.js'

const createOrder = async (reqBody) => {
  try {
  let { name, status, dateSend, senderEmail, receiverEmail, } = reqBody
  status = 'confirm'
  dateSend = new Date()
  const isSender = await userModel.findOne({ email: senderEmail })
  const isReceiver = await userModel.findOne({ email: receiverEmail })

  if (!isSender || !isReceiver) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid user")
  } else {
    const createdOrder = await orderModel.create( {
      name, 
      status: status,
      dateSend: dateSend,
      senderEmail: senderEmail,
      receiverEmail: receiverEmail,
    })
    return createdOrder
  }
  } catch (error) {
    throw error
  }
}

const updateOrder = async (id, status) => {
  try {
    let order = await orderModel.findOne({ _id: id })
    if (!order) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid order')
    } else {
      let newOrder = await orderModel.findOneAndUpdate(
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


export const tranEmployeeService = {
  createOrder,
  updateOrder
}