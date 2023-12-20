import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { employeeModel } from '../models/employeeModel.js'
import mongoose from 'mongoose'
import { tran1Model } from '../models/tran1.js'
import { tran2Model } from '../models/tran2.js'


const deleteEmployee = async (id) => {
  try { 
    let objectId = new mongoose.Types.ObjectId(id)
    const employee = await employeeModel.findById(objectId)
    if(employee.role === 'tran_employee') {
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
        role: 'tran_employee'
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
    if(id === '6554d12d2c07dd4087e973d1') {
      let send = await tran1Model.find({
        status: 'toGather'
      })

      let receive = await tran1Model.find({
        status: 'inPlace'
      })

      let sended = send.length
      let received = receive.length

      return {sended, received}
    } else if(id === '656d40bc0737c805b3df4282') {
      let send = await tran2Model.find({
        status: 'toGather'
      })

      let receive = await tran2Model.find({
        status: 'inPlace'
      })

      let sended = send.length
      let received = receive.length

      return {sended, received}
    }
  } catch (error) {
    throw error
  }
}

export const tranManagerService = {
  deleteEmployee,
  getALlEmployees,
  statistical
}