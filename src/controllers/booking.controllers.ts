import { NextFunction, Request, Response } from 'express'
import databaseService from '~/services/database.services'
import bookingService from '~/services/booking.services'
import { io } from '~/middlewares/socket.middleware'
export const bookingController = async (req: Request, res: Response, next: NextFunction) => {
  const bookingInfo = req.body
  const result = await bookingService.booking(bookingInfo)
  io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`)
    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected`)
    })

    socket.emit('bookingdriver', bookingInfo)
  })
  return res.json(result)
}
