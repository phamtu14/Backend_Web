import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { orderModel } from '../models/orderModel.js'
import { userModel } from '../models/userModel.js'

const createOrder = async (reqBody) => {
  try {
  let { name, status, dateSend, senderEmail, receiverEmail, } = reqBody
  status = 'sending'
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


export const gatherEmployeeService = {
  createOrder
}