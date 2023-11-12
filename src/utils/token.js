import jwt from 'jsonwebtoken'
import { env } from '../config/environment.js'

const generateAccessToken = (user) => {
  return jwt.sign({
    id: user.id,
    role: user.role
  },
  env.JWT_ACCESS_KEY,
  {expiresIn: "2h"}
  )  
} 

const generateRefreshToken = (user) => {
  return jwt.sign({
    id: user.id,
    role: user.role
  },
  env.JWT_REFRESH_KEY,
  {expiresIn: "30d"}
  )
}

export const token = {
  generateAccessToken,
  generateRefreshToken
}