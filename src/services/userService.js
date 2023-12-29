import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
// import { orderTranModel } from '../models/orderTranModel.js'
import mongoose from 'mongoose' 
import { orderUserModel } from '../models/userOrder.js'
import { tran1Model } from '../models/tran1.js'
import { tran2Model } from '../models/tran2.js'
 
//get all sended orders
const getAllSendOrders = async (senderEmail) => {
  try {
      const allOrders = await orderUserModel.find({
        status: 'send',
        senderEmail: senderEmail
      })
      return allOrders
    } catch (error) {
      throw error
     } 
   } 
//get all received orders
const getAllReceiveOrders = async (receiverEmail) => {
  try {
    const allOrders = await orderUserModel.find({
      status: 'received',
      receiverEmail: receiverEmail
    })
    return allOrders
  } catch (error) {
    throw error
   } 
}

// lấy tất cả đơn hàng được gửi tới
const allOrders = async (receiverEmail) => {
  try {
    const allOrders = await orderUserModel.find({
      status: 'toUser',
      receiverEmail: receiverEmail
    })
    return allOrders
  } catch (error) {
    throw error
   } 
}

// xác nhận đơn hàng
const acceptOrder = async(orderId, placeId) => {
  const id = new mongoose.Types.ObjectId(orderId)
  try {
    if(placeId === '6554d12d2c07dd4087e973d1') {
      let order = await orderUserModel.findOneAndUpdate(
        { _id: id},
            { $set: { status: 'received' } },
            { new: true } 
      )

      await tran1Model.findOneAndUpdate(
        { _id: id},
        { $set: { status: 'success' } },
        { new: true } 
      )
      return order
    } else if(placeId === '656d40bc0737c805b3df4282') {
      let order = await orderUserModel.findOneAndUpdate(
        { _id: id},
            { $set: { status: 'received' } },
            { new: true } 
      )

      await tran2Model.findOneAndUpdate(
        { _id: id},
        { $set: { status: success } },
        { new: true } 
      )
      return order
    }
  } catch (error) {
    throw error
  }
}


export const userService = {
  getAllSendOrders,
  getAllReceiveOrders,
  allOrders,
  acceptOrder
}