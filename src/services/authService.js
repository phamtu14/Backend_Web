import { userModel } from '../models/userModel.js'
import { employeeModel } from '../models/employeeModel.js'
import ApiError from '../utils/ApiError.js'
import {StatusCodes} from 'http-status-codes'
import bcrypt from 'bcrypt'




//get all user
const getUser = () => {
  const allUsers = userModel.find()
  return allUsers
}

//create new user
const createUser = async (reqBody) => {
  const allUsers = await getUser()
 
  try {
    const {name, email, password, address, phoneNumber, role} = reqBody
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    for(let i = 0; i < allUsers.length; i++) {
      if(allUsers[i].email === email && allUsers[i].phoneNumber === phoneNumber) {
        throw new Error('User already exists')
      }
    }
    const createdUser = await userModel.create({
      name: name, 
      email,
      password: hashed,
      address,
      phoneNumber,
      role
    })
    return createdUser
  } catch (error) {
    throw error
  }
}

//create a new employee
const createEmployee = async (reqBody) => {
  try {
    const {name, email, password, role} = reqBody
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)
    const createdUser = await employeeModel.create({
      name: name, 
      email,
      password: hashed,
      role
    })
    return createdUser
  } catch (error) {
    throw error
  }
}

//login
const login = async (reqBody) => {
  try {
    const employee = await employeeModel.findOne({email: reqBody.email})
    const user = await userModel.findOne({email: reqBody.email})
    if(!user && !employee) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Wrong email address")
    }
    if(user && !employee) {
      const validUserPassword = await bcrypt.compare(reqBody.password, user.password)
      if(!validUserPassword) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Wrong password")
      }
      if(user && validUserPassword) {
        const {password, ...others} = user._doc
        return others
      }  
    }

    if(!user && employee) {
      const validEmployeePassword = await bcrypt.compare(reqBody.password, employee.password)
      if(!validEmployeePassword) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Wrong password")
      }
      if(employee && validEmployeePassword) {
        const {password, ...others} = employee._doc
        return others
      } 
    }
    
  } catch (error) {
    throw error
  }
}

export const authService = {
  createUser, 
  getUser,
  login,
  createEmployee
}