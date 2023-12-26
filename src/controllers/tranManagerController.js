import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError.js'
import { tranManagerService } from '../services/tranManagerService.js'

const deleteEmployee = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await tranManagerService.deleteEmployee(id)
    if (typeof result === 'object') {
      res.status(StatusCodes.OK).json( result )
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json( result ) 
    }
    next()
  } catch (error) {
    next(error)
  }
}

const getALlEmployees = async (req, res, next) => {
  try {
    const id = req.headers.id
    const results = await tranManagerService.getALlEmployees(id)
    res.status(StatusCodes.OK).json( results )
    next()
  } catch (error) {
    next( error)
  }
}

// thống kê hàng gửi, hàng nhận
const statistical = async (req, res, next) => {
  try {
    const id = req.headers.placeId
    if(!id) {
      return 'Missing place id'
    } else {
      const result = await tranManagerService.statistical(id);
      res.status(StatusCodes.OK).json( result )
    }
  } catch (error) {
    next( error )
  }
}

export const tranManagerController = {
  deleteEmployee,
  getALlEmployees,
  statistical
}