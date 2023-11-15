import { StatusCodes } from 'http-status-codes'
import ApiError from '../utils/ApiError.js'
import { bossService } from '../services/bossService.js'


//get all employees
const getAllEmployees =  async (req, res, next) => {
  try {
    const allEmployees = await bossService.getAllEmployees()
    res.status(StatusCodes.OK).json(allEmployees)
    next()
  } catch (error) {
    next(error)
  }
}

//delete an employee
const deleteEmployee = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await bossService.deleteEmployee(id)
    console.log(result)
    res.status(StatusCodes.OK).json( result )
    next()
  } catch (error) {
    next(error)
  }
}

//create a new place point
const createPlace = async (req, res, next) => {
  try {
    const {name, address, type, managerEmail} = req.body
    if(!address || !type || !managerEmail) {
      throw new ApiError(StatusCodes.NO_CONTENT, 'Invalid input')
    } else {
      const createdPlace = await bossService.createPlace(req.body)
      res.status(StatusCodes.CREATED).json(createdPlace)
    }
  }catch (error) {
    next(error)
  }
}

//get all place points

const getAllPlaces = async (req, res, next) => {
  try {
    const allPlaces = await bossService.getAllPlaces()
    res.status(StatusCodes.OK).json(allPlaces)
    next()
  } catch (error) {
    next(error)
  }
}

export const bossController = {
  getAllEmployees,
  deleteEmployee,
  createPlace,
  getAllPlaces
}