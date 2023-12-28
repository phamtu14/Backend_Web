import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { tran2Model } from '../models/tran2.js'
import { userModel } from '../models/userModel.js'
import { tran1Model } from '../models/tran1.js'
import { ga1Model } from '../models/ga1.js'
import { ga2Model } from '../models/ga2.js'
import { orderUserModel } from '../models/userOrder.js'
import mongoose from 'mongoose'


//tạo đơn hàng cho người gửi và trả lại thông tin đơn hàng
const createOrder = async (reqBody) => {
  try {
  let { name, senderEmail, receiverEmail, placeId} = reqBody
  let status = 'toGather'
  let dateSend = new Date()
  const isSender = await userModel.findOne({ email: senderEmail })
  const isReceiver = await userModel.findOne({ email: receiverEmail })

  if (!isSender || !isReceiver) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid user")
   } else if (placeId === '6554d12d2c07dd4087e973d1') {
    const createdOrder = await tran1Model.create( {
          name, 
          status: status,
          dateSend: dateSend,
          senderEmail: senderEmail,
          receiverEmail: receiverEmail,
          placeId
        })
    let newStatus = "send"
    createdOrder.status = newStatus
    await orderUserModel.insertMany(createdOrder)
    return createdOrder
   } else if(placeId === '656d40bc0737c805b3df4282') {
    const createdOrder = await tran2Model.create( {
      name, 
      status: status,
      dateSend: dateSend,
      senderEmail: senderEmail,
      receiverEmail: receiverEmail,
      placeId
    })
    let newStatus = "send"
    createdOrder.status = newStatus
    await orderUserModel.insertMany(createdOrder)
    return createdOrder
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
        ga1Model.insertMany(newOrder)
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
        ga2Model.insertMany (newOrder)
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
    let status = 'failed'
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

//thống kê
const statistical = async (id) => {
  try {
    if(id === '6554d12d2c07dd4087e973d1') {
      let successful = await tran1Model.find({
        status: 'success'
      })
      let failure = await tran1Model.find({
        status: 'failed'
      })
      let success = successful.length
      let failed = failure.length
      return {success, failed}
    } else if(id === '656d40bc0737c805b3df4282') {
      let successful = await tran2Model.find({
        status: 'success'
      })
      let failure = await tran2Model.find({
        status: 'failed'
      })
      let success = successful.length
      let failed = failure.length
      return {success, failed}
    }
  } catch (error) {
    throw error
  }
}

// //trả hàng cho người nhận
// const updateOrder = async (placeId, id, status) => {
//   try {
//     if (placeId === '6554d12d2c07dd4087e973d1') {
//       if(status === 'success') {
//         let order = await tran1Model.findOneAndUpdate(
//           { _id: id },
//           { $set: { status: status } },
//           {$set : {dateReceive: new Date()}}, 
//           { new: true } 
//         )

//         let {_id, ...others} = order._doc

//         await orderUserModel.create(others)
//         return 'Gửi thành công'
//       } else if(status === 'failed') {
//         await tran1Model.findOneAndUpdate(
//           { _id: id },
//           { $set: { status: status } },
//           {$set : {dateReceive: new Date()}}, 
//           { new: true } 
//         )
        
//         return 'Gửi thất bại'
//       }
//     } else if(placeId === '656d40bc0737c805b3df4282'){
//       if(status === 'success') {
//         let order = await tran2Model.findOneAndUpdate(
//           { _id: id },
//           { $set: { status: status } },
//           {$set : {dateReceive: new Date()}}, 
//           { new: true } 
//         )

//         let {_id, ...others} = order._doc

//         await orderUserModel.create(others)
//         return 'Gửi thành công'
//       } else if(status === 'failed') {
//         await tran2Model.findOneAndUpdate(
//           { _id: id },
//           { $set: { status: status } },
//           {$set : {dateReceive: new Date()}}, 
//           { new: true } 
//         )
        
//         return 'Gửi thất bại'
//       }
//     }
//   } catch (error) {
//     throw error
//   }
// }

// lấy tất cả đơn hàng để gửi lại cho người nhận
const allToUser = async (id) => {
  try {
    if(id === '6554d12d2c07dd4087e973d1') {
      let result = await tran1Model.find({
        status: 'failed'
      })
      return result
    } else if(id === '656d40bc0737c805b3df4282') {
      let result = await tran2Model.find({
        status: 'failed'
      })
      return result
    }
  } catch (error) {
    throw error
  }
}

// gửi hàng tới người nhận
const toUser = async(placeId, orderId) => {
  try {
    if(placeId === '6554d12d2c07dd4087e973d1') {

      let status = 'toUser'

      let order = await tran1Model.findOneAndUpdate(
        { _id: orderId },
        { $set: { status: status } },
        { new: true } 
      )

      await orderUserModel.insertMany(order)
      return order
    } else if(placeId === '656d40bc0737c805b3df4282') {
     let status = 'toUser'

      let order = await tran2Model.findOneAndUpdate(
        { _id: orderId },
        { $set: { status: status } },
        { new: true } 
      )
      
      await orderUserModel.insertMany(order)
      return order
    }
  } catch (error) {
    throw error
  }
}

export const tranEmployeeService = {
  createOrder,
  toGatherPlace,
  allOrdersToGather,
  allOrdersRecGather,
  recGatherPlace,
  statistical,
  allToUser,
  toUser
}