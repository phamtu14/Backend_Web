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

export const tranManagerController = {
  deleteEmployee,

}