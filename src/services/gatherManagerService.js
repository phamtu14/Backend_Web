import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { employeeModel } from '../models/employeeModel.js'
import mongoose from 'mongoose'
import { ga1Model } from '../models/ga1.js'
import { ga2Model } from '../models/ga2.js'


const deleteEmployee = async (id) => {
  try { 
    let objectId = new mongoose.Types.ObjectId(id)
    const employee = await employeeModel.findById(objectId)
    if(employee.role === 'gather_employee') {
      const deleted = employee
      await employeeModel.deleteOne(objectId) 
      return deleted
    } else {
      return 'this is not a employee'
    }
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
  }
}

const getALlEmployees = async (id) => {
    try {
      const isManager = await employeeModel.findOne({
        _id: id
      })
      if(!isManager) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'This is not a manager')
      } else {
        const results = await employeeModel.find({
          placeId: isManager.placeId,
          role: 'gather_employee'
        })
        return results
      } 
    } catch (error) {
      throw error
    }
  }

  //thống kê hàng gửi, hàng nhận tại điểm giao dịch
const statistical = async (id) => {
  try {
    if(id === '6554d16f2c07dd4087e973d3') {
      let send = await ga1Model.find({
        status: 'toNextGather'
      })

      let receive = await ga1Model.find({
        status: 'inGather'
      })

      let sended = send.length
      let received = receive.length

      return {sended, received}
    } else if(id === '656d3f717662b1b1d89232bb') {
      let send = await ga2Model.find({
        status: 'toNextGather'
      })

      let receive = await ga2Model.find({
        status: 'inGather'
      })

      let sended = send.length
      let received = receive.length

      return {sended, received}
    }
  } catch (error) {
    throw error
  }
}

export const gatherManagerService = {
  deleteEmployee,
  getALlEmployees,
  statistical
}