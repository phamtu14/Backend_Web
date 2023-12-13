import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { employeeModel } from '../models/employeeModel.js'
import mongoose from 'mongoose'


const deleteEmployee = async (id) => {
  try { 
    const ObjectId = new mongoose.Types.ObjectId(id)
    const employee = await employeeModel.findById(ObjectId)
    if(employee.role === 'gather_employee') {
      const deleted = employee
      await employeeModel.deleteOne(ObjectId)
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

export const gatherManagerService = {
  deleteEmployee,
  getALlEmployees
}