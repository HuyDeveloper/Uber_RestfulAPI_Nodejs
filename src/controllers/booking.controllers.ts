import { NextFunction, Request, Response } from 'express'
import databaseService from '~/services/database.services'
import bookingService from '~/services/booking.services'
import rabbitMQService from '~/services/rabbitmq.services'
import { io, SOCKET } from '~/middlewares/socket.middleware'
import amqp from 'amqplib'
const amqp_url_cloud = process.env.RABBITMQ_CLOUD as string
// Connection URL
const connectionUrl = 'amqp://localhost'
export const bookingController = async (req: Request, res: Response, next: NextFunction) => {
  const bookingInfo = req.body
  const result = await bookingService.booking(bookingInfo)
  rabbitMQService.sendMsg({ msg: JSON.stringify(bookingInfo) })
  SOCKET.emit(`${bookingInfo.typeVerhicle}`, bookingInfo)
  return res.json(result)
}

export const acceptController = async (req: Request, res: Response) => {
  const queueName = req.params.id
  // rabbitMQService.receiveMsg(queueName)
  // console.log(rabbitMQService.messageReceive)
  // return res.json(rabbitMQService.messageReceive)
  try {
    const connection = await amqp.connect(connectionUrl)
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, { durable: true })
    let temp
    await channel.consume(
      queueName,
      (msg) => {
        console.log('Received message:', (msg as amqp.Message).content.toString())
        channel.ack(msg as amqp.Message)
        channel.close()
        temp = (msg as amqp.Message).content.toString()
      },
      { noAck: false }
    )
    return res.json(temp)
  } catch (error) {
    console.error('Error occurred while consuming messages:', error)
  }
}
