import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { employeeModel } from '../models/employeeModel.js'
import mongoose from 'mongoose'


const deleteEmployee = async (id) => {
  try { 
    const employee = await employeeModel.findById(id)
    if(employee.role === 'tran_employee') {
      const deleted = employee
      await employeeModel.deleteOne(id)
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

export const tranManagerService = {
  deleteEmployee,
  getALlEmployees
}