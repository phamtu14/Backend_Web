import { StatusCodes } from 'http-status-codes'
import { authService } from '../services/authService.js'
import ApiError from '../utils/ApiError.js'
import { token } from '../utils/token.js'

//create a new user
const createUser = async (req, res, next) => {
  try {
    const {name, email, password, address, phoneNumber, role} = req.body
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const checkEmail = regex.test(email)
    if(!name || !email || !password || !role || !address || !phoneNumber) {
      throw new ApiError(StatusCodes.NO_CONTENT, 'Invalid input')
    } else if (!checkEmail) {
      throw new ApiError(300, 'Invalid email')
    } else {
      const createdUser = await authService.createUser(req.body)
      res.status(StatusCodes.CREATED).json(createdUser)
    }

  } catch (error) { next(error) }
}

//create a new employee
const createEmployee = async (req, res, next) => {
  try {
    const {name, email, password, role} = req.body
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const checkEmail = regex.test(email)
    if(!name || !email || !password || !role) {
      throw new ApiError(StatusCodes.NO_CONTENT, 'Invalid input')
    } else if (!checkEmail) {
      throw new ApiError(300, 'Invalid email')
    } else {
      const createdUser = await authService.createEmployee(req.body)
      res.status(StatusCodes.CREATED).json(createdUser)
    }

  } catch (error) { next(error) }
}

//handle login
const login = async (req, res, next) => {
  try {
    const {email, password} = req.body
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const checkEmail = regex.test(email)
    if(!email || !password ) {
      throw new ApiError(StatusCodes.NO_CONTENT, 'Invalid input')
    } else if (!checkEmail) {
      throw new ApiError(300, 'Invalid email')
    } else {
      const validUser = await authService.login(req.body)
      const accessToken = token.generateAccessToken(validUser)
      const refreshToken = token.generateRefreshToken(validUser)
      res.status(StatusCodes.OK).json({
        validUser,
        accessToken, 
        refreshToken
      })
      
    }

  } catch (error) { next(error) }
}

export const authController = {
  createUser, 
  login,
  createEmployee
}