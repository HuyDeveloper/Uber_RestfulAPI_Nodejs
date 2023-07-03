import express, { Request, Response, NextFunction } from "express"
import {
  loginController,
  registerController,
  logoutController,
  refreshTokenController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from './../utils/handlers'
const router = express.Router()

router.post('/login', loginValidator, wrapRequestHandler(loginController))
router.post('/register', registerValidator, wrapRequestHandler(registerController))
router.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))
router.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))
export default router
