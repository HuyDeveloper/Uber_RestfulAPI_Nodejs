import { NextFunction, Request, Response } from 'express'
import databaseService from '~/services/database.services'
import bookingService from '~/services/booking.services'
import rabbitMQService from '~/services/rabbitmq.services'
import { io, SOCKET } from '~/middlewares/socket.middleware'

export const bookingController = async (req: Request, res: Response, next: NextFunction) => {
  const bookingInfo = req.body
  const result = await bookingService.booking(bookingInfo)
  console.log(bookingInfo)

  // const msgs = rabbitMQService.sendMsg({ msg: 'Hello' })
  // io.on('connection', (socket) => {
  //   console.log(`User ${socket.id} connected`)
  //   socket.emit('bookingdriver', bookingInfo)
  //   socket.on('disconnect', () => {
  //     console.log(`User ${socket.id} disconnected`)
  //   })
  // })
  SOCKET.emit('bookingdriver', bookingInfo)
  return res.json(result)
}
