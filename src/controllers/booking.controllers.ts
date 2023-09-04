import { NextFunction, Request, Response } from 'express'
import databaseService from '~/services/database.services'
import bookingService from '~/services/booking.services'
import rabbitMQService from '~/services/rabbitmq.services'
import { io, SOCKET } from '~/middlewares/socket.middleware'

export const bookingController = async (req: Request, res: Response, next: NextFunction) => {
  const bookingInfo = req.body
  const result = await bookingService.booking(bookingInfo)
  rabbitMQService.sendMsg({ msg: JSON.stringify(bookingInfo) })
  console.log(typeof JSON.stringify(bookingInfo))
  SOCKET.emit('bookingdriver', bookingInfo)
  return res.json(result)
}

export const acceptController = async (req: Request, res: Response) => {
  rabbitMQService.receiveMsg()
  console.log(rabbitMQService.messageReceive)
  return res.json(rabbitMQService.messageReceive)
}
