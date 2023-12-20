import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import { employeeModel } from '../models/employeeModel.js'
import mongoose from 'mongoose'
import { placeModel } from '../models/placeModel.js'
import { gatherManagerService } from '../services/gatherManagerService.js'
import { tranManagerService } from '../services/tranManagerService.js'

//get all employees
const getAllEmployees = async () => {
  const tran = await employeeModel.find({
    role: 'tran_manager' 
  })

  const gather = await employeeModel.find({
    role: 'gather_manager'
  })

  const allEmployees = [...tran, ...gather]

  return allEmployees
}

//delete an employee
const deleteEmployee = async (id) => {
try { 
  const ObjectId = new mongoose.Types.ObjectId(id)
  const employee = await employeeModel.findById(ObjectId)
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

const statistical = async (option) => {
  try {
    let tran1 = await tranManagerService.statistical('6554d12d2c07dd4087e973d1')
    let tran2 = await tranManagerService.statistical('656d40bc0737c805b3df4282')
    let gather1 = await gatherManagerService.statistical('6554d16f2c07dd4087e973d3')
    let gather2 = await gatherManagerService.statistical('656d3f717662b1b1d89232bb')

    if(option === '6554d12d2c07dd4087e973d1') {
      return tran1
    } else if(option === '656d40bc0737c805b3df4282') {
      return tran2
    } else if(option === '6554d16f2c07dd4087e973d3') {
      return gather1
    } else if( option === '656d3f717662b1b1d89232bb') {
      return gather2
    } else if(option === 'all') {
      let tranSended = tran1.sended + tran2.sended
      let tranReceived = tran1.received + tran2.received

      let gatherSended = gather1.sended + gather2.sended
      let gatherReceived = gather1.received + gather2.received

      let tran = {tranSended, tranReceived}
      let gather = {gatherSended, gatherReceived}

      return {tran, gather}

    }
  } catch (error) {
    throw error
  }
}

export const bossService = {
  getAllEmployees,
  deleteEmployee,
  createPlace,
  getAllPlaces, 
  statistical
}