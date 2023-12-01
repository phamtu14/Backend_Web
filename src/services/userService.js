import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { orderModel } from '../models/orderModel.js'
import { userModel } from '../models/userModel.js'
import mongoose from 'mongoose'

//get all sended orders
const getAllSendOrders = async (id) => {
  try {
    const objectId = new mongoose.Types.ObjectId(id)
    const isUser = await userModel.findOne({ _id: objectId })
    console.log(isUser)
    if (!isUser) {
      return 'this is not a user'
    } else {
    const allOrders = await orderModel.find()
    const userOrders = []
    for( let i = 0; i < allOrders.length; i ++) {
      if( allOrders[i].senderEmail === isUser.email ) {
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
const getAllReceiveOrders = async (id) => {
 try {
  const objectId = new mongoose.Types.ObjectId(id)
  const isUser = await userModel.findOne({ _id: objectId })
  if (!isUser) {
    return 'this is not a user'
  } else {
  const allOrders = await orderModel.find()
  const userOrders = []
  for( let i = 0; i < allOrders.length; i ++) {
    if( allOrders[i].receiverEmail === isUser.email && allOrders[i].status === 'received' ) {
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