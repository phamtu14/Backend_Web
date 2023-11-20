import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { orderModel } from '../models/orderModel.js'
import { userModel } from '../models/userModel.js'

//get all sended orders
const getAllSendOrders = async (userEmail) => {
  try {
    const isUser = await userModel.findOne({ email: userEmail })
    if (!isUser) {
      return 'this is not a user'
    } else {
    const allOrders = await orderModel.find()
    const userOrders = []
    for( let i = 0; i < allOrders.length; i ++) {
      if( allOrders[i].senderEmail === userEmail ) {
        if(allOrders[i].status === 'received') {
          allOrders[i].status = 'sended'
        }
        userOrders.push(allOrders[i])
      }
    }
    return userOrders
    }
   } catch (error) {
    throw error
   }
}

//get all received orders
const getAllReceiveOrders = async (userEmail) => {
 try {
  const isUser = await userModel.findOne({ email: userEmail })
  if (!isUser) {
    return 'this is not a user'
  } else {
  const allOrders = await orderModel.find()
  const userOrders = []
  for( let i = 0; i < allOrders.length; i ++) {
    if( allOrders[i].receiverEmail === userEmail && allOrders[i].status === 'received' ) {
      userOrders.push(allOrders[i])
    }
  }
  return userOrders
  }
 } catch (error) {
  throw error
 }
}

export const userService = {
  getAllSendOrders,
  getAllReceiveOrders
}