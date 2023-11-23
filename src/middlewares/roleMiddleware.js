import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError.js'

export const roleMiddleware = (role) => {
  return (req, res, next) => {
    try {
      if(req.headers.role === role) {
        next()
      }
    } catch (error) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized") 
    }
  } 
}