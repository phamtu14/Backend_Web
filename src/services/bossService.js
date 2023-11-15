import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { employeeModel } from '../models/employeeModel.js'
import mongoose from 'mongoose'
import { placeModel } from '../models/placeModel.js'

//get all employees
const getAllEmployees = async () => {
  const allEmployees = await employeeModel.find()
  return allEmployees
}

//delete an employee
const deleteEmployee = async (id) => {
try { 
  const ObjectId = new mongoose.Types.ObjectId(id)
  const employee = await employeeModel.findById(ObjectId)
  console.log(employee.role)
  if(employee.role === 'gather_manager' || employee.role === 'tran_manager') {
    const deleted = employee
    await employeeModel.deleteOne(ObjectId)
    return deleted
  } else {
    return 'this is not a manager'
  }
  
} catch (error) {
  throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
}
}


//create a new place point
const createPlace = async (reqBody) => {
  try {
    const { name, address, type, managerEmail } = reqBody
    const createdPlace = await placeModel.create({
      name, 
      address, 
      type,
      managerEmail
    })
    return createdPlace
  } catch (error) {
    throw error
  }
}

//get all place points
const getAllPlaces = async () => {
  const allPlaces = await placeModel.find()
  return allPlaces
}

export const bossService = {
  getAllEmployees,
  deleteEmployee,
  createPlace,
  getAllPlaces,
}