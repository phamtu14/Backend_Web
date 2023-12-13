import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { tran2Model } from '../models/tran2.js'
import { userModel } from '../models/userModel.js'
import { tran1Model } from '../models/tran1.js'
import { ga1Model } from '../models/ga1.js'
import { ga2Model } from '../models/ga2.js'
import mongoose from 'mongoose'


//tạo đơn hàng cho người gửi và trả lại thông tin đơn hàng
const createOrder = async (reqBody) => {
  try {
  let { name, status, dateSend, senderEmail, receiverEmail, tranPlaceId} = reqBody
  status = 'toGather'
  dateSend = new Date()
  const isSender = await userModel.findOne({ email: senderEmail })
  const isReceiver = await userModel.findOne({ email: receiverEmail })

  if (!isSender || !isReceiver) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid user")
   } else if (tranPlaceId === '6554d12d2c07dd4087e973d1') {
    const createdOrder = await tran1Model.create( {
          name, 
          status: status,
          dateSend: dateSend,
          senderEmail: senderEmail,
          receiverEmail: receiverEmail,
          tranPlaceId
        })
        return createdOrder
   } else if(tranPlaceId === '656d40bc0737c805b3df4282') {
    const createdOrder = await tran2Model.create( {
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
    let order1 = await tran1Model.findOne({ _id: id })
    let order2 = await tran2Model.findOne({ _id: id })

    if (!order1 && !order2) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid order')
    } else if(order1 && !order2){
      let newOrder = await tran1Model.findOneAndUpdate(
        { _id: id },
        { $set: { status: status } },
        {$set : {dateReceive: new Date()}}, 
        { new: true } 
      )
      let result = await userModel.create(newOrder)
      return result
    } else if(!order1 && order2){
      let newOrder = await tran2Model.findOneAndUpdate(
        { _id: id },
        { $set: { status: status } },
        {$set : {dateReceive: new Date()}},
        { new: true } 
      )
      let result = await userModel.create(newOrder)
      return result
    }
  } catch (error) {
    throw error
  }
}

// lấy tất cả đơn hàng sẽ gửi tới điểm tập kết
const allOrdersToGather = async (id) => {
  try {
    // let objectId = new mongoose.Types.ObjectId(id)
    if(id === '6554d12d2c07dd4087e973d1') {
      const allOrders = await tran1Model.find({
        status: 'toGather'
      })
      return allOrders
    } else if(id === '656d40bc0737c805b3df4282') {
      const allOrders = await tran2Model.find({
        status: 'toGather'
      })
      return allOrders
    }
  } catch (error) {
    throw error
  }
}



// tạo đơn hàng gửi tới điểm tập kết
const toGatherPlace = async (id, orders) => {  
  try {
    if(id === '6554d12d2c07dd4087e973d1') {
      orders.map(order => {
        let status = 'pending'
        let newOrder = {...order, status}
        ga1Model.create(newOrder)
      })
  
      for (let index = 0; index < orders.length; index++) {
        const element = orders[index]
        await tran1Model.deleteOne({
          _id: element._id,
        })
      }
      return 'Gửi thành công'
    } else if(id === '656d40bc0737c805b3df4282') {
      orders.map(order => {
        let status = 'pending'
        let newOrder = {...order, status}
        ga2Model.create(newOrder)
      })
  
      for (let index = 0; index < orders.length; index++) {
        const element = orders[index]
        await tran2Model.deleteOne({
          _id: element._id,
        })
      }
      return 'Gửi thành công'
    }

  } catch (error) {
    throw error
  }
}

//lay tat ca don hang tu diem tap ket ve
const allOrdersRecGather = async (id) => {
  try {
    // let objectId = new mongoose.Types.ObjectId(id)
    if(id === '6554d12d2c07dd4087e973d1') {
      const allOrders = await tran1Model.find({
        status: 'pending'
      })
      return allOrders
    } else if(id === '656d40bc0737c805b3df4282') {
      const allOrders = await tran2Model.find({
        status: 'pending'
      })
      return allOrders
    }
  } catch (error) {
    throw error
  }
}

//nhận hàng từ điểm tập kết
const recGatherPlace = async (id) => {
  try {
    let status = 'inPlace'
    if (id === '6554d12d2c07dd4087e973d1') {
      let allOrders = await tran1Model.find({
        status: 'pending'
      })
      for(let i = 0; i < allOrders.length; i++) {
        await tran1Model.findOneAndUpdate(
          { _id: allOrders[i]._id },
          { $set: { status: status } },
          { new: true } 
        )
      }
      return 'Thêm thành công'

    } else if (id === '656d40bc0737c805b3df4282') {
      let allOrders = await tran2Model.find({
        status: 'pending'
      })
      for(let i = 0; i < allOrders.length; i++) {
        await tran2Model.findOneAndUpdate(
          { _id: allOrders[i]._id },
          { $set: { status: status } },
          { new: true } 
        )
      }
      return 'Thêm thành công'
    }
  } catch (error) {
    throw error
  }
}

export const tranEmployeeService = {
  createOrder,
  updateOrder,
  toGatherPlace,
  allOrdersToGather,
  allOrdersRecGather,
  recGatherPlace
}