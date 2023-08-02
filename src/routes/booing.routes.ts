import express from 'express'
import { bookingValidator } from '~/middlewares/booking.middleware'
import { wrapRequestHandler } from './../utils/handlers'
import {bookingController} from '~/controllers/booking.controllers'
const router = express.Router()

router.post(('/booking', bookingValidator, wrapRequestHandler(bookingController)))

export default router;