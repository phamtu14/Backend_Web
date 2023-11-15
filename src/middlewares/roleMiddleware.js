import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError'

export const roleMiddleware = (role) => {
  return (req, res, next) => {
    try {
      if(req.body.role === role) {
        res.status(StatusCodes.OK)
        next()
      }
    } catch (error) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized") 
    }
  } 
}