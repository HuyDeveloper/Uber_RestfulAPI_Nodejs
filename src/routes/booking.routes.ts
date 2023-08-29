import express from 'express'
import { bookingValidator } from '~/middlewares/booking.middleware'
import { wrapRequestHandler } from '../utils/handlers'
import { bookingController, acceptController } from '~/controllers/booking.controllers'
const router = express.Router()

router.post('/booking-service', bookingValidator, wrapRequestHandler(bookingController))
router.get('/accept-booking', wrapRequestHandler(acceptController))
export default router
