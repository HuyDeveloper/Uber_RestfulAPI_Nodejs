import { NextFunction, Request, Response } from 'express'
import databaseService from '~/services/database.services'
import Booking from '~/models/schemas/Booking.schema'
import bookingService from '~/services/booking.services'
export const bookingController = async (req: Request, res: Response, next: NextFunction) => {
  const booking = req.body
  const result = await bookingService.booking(booking)
  return res.json({
    message: 'Booking Success',
    result
  })
}
