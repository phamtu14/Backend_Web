import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { employeeModel } from '../models/employeeModel.js'
import mongoose from 'mongoose'


const deleteEmployee = async (id) => {
  try { 
    const ObjectId = new mongoose.Types.ObjectId(id)
    const employee = await employeeModel.findById(ObjectId)
    if(employee.role === 'tran_employee') {
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

export const tranManagerService = {
  deleteEmployee
}