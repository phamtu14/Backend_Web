import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { authRoutes } from './authRoutes.js'
import { tranManagerRoutes } from './tranManagerRoutes.js'
import { gatherManagerRoutes } from './gatherManagerRoutes.js'
import { bossRoutes } from './bossRoutes.js'
import { env } from '../../config/environment.js'

const Router = express.Router()


Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use'})
})

Router.use('/auth', authRoutes)

Router.use('/transaction', tranManagerRoutes )

Router.use('/gather', gatherManagerRoutes)

Router.use('/boss', bossRoutes)

export const API = Router
