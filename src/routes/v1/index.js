import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { authRoutes } from './authRoutes.js'
import { tranManagerRoutes } from './tranManagerRoutes.js'
import { gatherManagerRoutes } from './gatherManagerRoutes.js'
import { bossRoutes } from './bossRoutes.js'
import { userRoutes } from './userRoutes.js'
import { tranEmployeeRoutes } from './tranEmployeeRoutes.js'

const Router = express.Router()


Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use'})
})

Router.use('/auth', authRoutes)

Router.use('/traManager', tranManagerRoutes )

Router.use('/gaManager', gatherManagerRoutes)

Router.use('/boss', bossRoutes)

Router.use('/user', userRoutes)

Router.use('/tranEmployee', tranEmployeeRoutes)

export const API = Router
