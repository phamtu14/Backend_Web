import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { ga1Model } from '../models/ga1.js'
import { ga2Model } from '../models/ga2.js'

// lấy tất cả đơn hàng từ điểm giao dịch
const allOrderFromTran = async (id) => {
  try {
    if(id === '6554d16f2c07dd4087e973d3') {
      return await ga1Model.find({
        status: 'pending'
      })
    } else if(id === '656d3f717662b1b1d89232bb') {
      return await ga2Model.find({
        status: 'pending'
      })
    }
  } catch (error) {
    throw error
  }
} 

// xác nhận đơn hàng từ điểm giao dịch gửi tới
const toGather = async (id) => {
  try {
    let status = 'inGather'
    if (id === '6554d16f2c07dd4087e973d3') {
      let allOrders = await ga1Model.find({
        status: 'pending'
      })
      for(let i = 0; i < allOrders.length; i++) {
        await ga1Model.findOneAndUpdate(
          { _id: allOrders[i]._id },
          { $set: { status: status } },
          { new: true } 
        )
      }
      return 'Thêm thành công'

    } else if (id === '656d3f717662b1b1d89232bb') {
      let allOrders = await ga2Model.find({
        status: 'pending'
      })
      for(let i = 0; i < allOrders.length; i++) {
        await ga2Model.findOneAndUpdate(
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

// lấy tất cả đơn hàng gửi tới điểm tập kết đích
const allOrderToEnd = async (id) => {
  try {
    if(id === '6554d16f2c07dd4087e973d3') {
      return await ga1Model.find({
        status: 'inGather'
      })
    } else if(id === '656d3f717662b1b1d89232bb') {
      return await ga2Model.find({
        status: 'inGather'
      })
    }
  } catch (error) {
    throw error
  }
}


// tạo đơn hàng tới điểm tập kết đích
const toEndGather = async (id, orders) => {
  try {
    if(id === '6554d16f2c07dd4087e973d3') {
      orders.map(order => {
        let status = 'toNextGather'
        let newOrder = {...order, status}
        ga2Model.create(newOrder)
      })
  
      for (let index = 0; index < orders.length; index++) {
        const element = orders[index]
        await ga1Model.deleteOne({
          _id: element._id,
        })
      }
      return 'Gửi thành công'
    } else if(id === '656d3f717662b1b1d89232bb') {
      orders.map(order => {
        let status = 'toNextGather'
        let newOrder = {...order, status}
        ga1Model.create(newOrder)
      })
  
      for (let index = 0; index < orders.length; index++) {
        const element = orders[index]
        await ga2Model.deleteOne({
          _id: element._id,
        })
      }
      return 'Gửi thành công'
    }
  } catch (error) {
    throw error
  }
}




export const gatherEmployeeService = {
  toGather,
  allOrderToEnd,
  toEndGather,
  allOrderFromTran
}