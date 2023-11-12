import jwt from 'jsonwebtoken';
import { env } from '../config/environment';
import StatusCodes from 'http-status-codes'
import ApiError from '../utils/ApiError';

export const jwtMiddleware = () => {
  //verify token
  const verifyToken = (req, res, next) => {
    const token = req.header.token
    if(token) {
      const accessToken = token.split(" ")[1]
      jwt.verify(accessToken, env.JWT_ACCESS_KEY, (err, user) => {
        if(err) {
          throw new ApiError(StatusCodes.FORBIDDEN, 'Token is not invalid')
        }
        req.user = user
        next()
      })
    } else {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authenticated')
    }
  }
}