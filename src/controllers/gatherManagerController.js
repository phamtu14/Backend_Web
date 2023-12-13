import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError.js'
import { gatherManagerService } from '../services/gatherManagerService.js'

const deleteEmployee = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await gatherManagerService.deleteEmployee(id)
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
    const results = await gatherManagerService.getALlEmployees(id)
    res.status(StatusCodes.OK).json( results )
    next()
  } catch (error) {
    next( error)
  }
}

export const gatherManagerController = {
  deleteEmployee,
  getALlEmployees
}