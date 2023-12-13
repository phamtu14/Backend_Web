import express from 'express'
import { authRoutes } from './authRoutes.js'
import { tranManagerRoutes } from './tranManagerRoutes.js'
import { gatherManagerRoutes } from './gatherManagerRoutes.js'
import { bossRoutes } from './bossRoutes.js'
import { userRoutes } from './userRoutes.js'
import { tranEmployeeRoutes } from './tranEmployeeRoutes.js'
import { gatherEmployeeRoutes } from './gatherEmployeeRoutes.js'

const Router = express.Router()

Router.use('/auth', authRoutes)

Router.use('/tranManager', tranManagerRoutes )

Router.use('/gatherManager', gatherManagerRoutes)

Router.use('/boss', bossRoutes)

Router.use('/user', userRoutes)

Router.use('/tranEmployee', tranEmployeeRoutes)

Router.use('/gatherEmployee', gatherEmployeeRoutes)

export const API = Router
