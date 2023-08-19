import amqplib from 'amqplib'
import dotenv from 'dotenv'
const amqp_url_cloud = process.env.RABBITMQ_CLOUD as string

class RabbitMQService {
  async sendMsg({ msg }: { msg: string }) {
    try {
      const conn = await amqplib.connect(amqp_url_cloud)
      const channel = await conn.createChannel()
      // const queue = 'booking'
      // await channel.assertQueue(queue, {
      //   durable: true //không mât queue khi rabbitmq bị tắt
      // })
      // await channel.sendToQueue(queue, Buffer.from(msg),{
      //   expiration: '10000', //time to live
      //   persistent: true //lưu lại khi rabbitmq bị tắt
      // })

      //create exchange
      const nameExchange = 'booking'
      await channel.assertExchange(nameExchange, 'fanout', { durable: false })
      await channel.publish(nameExchange, '', Buffer.from(msg))
      console.log(`Send: ${msg}`)
      setTimeout(function () {
        conn.close()
        process.exit(0)
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  async receiveMsg() {
    try {
      const conn = await amqplib.connect(amqp_url_cloud)
      const channel = await conn.createChannel()
      // const queue = 'booking'
      // await channel.assertQueue(queue, {
      //   durable: true
      // })
      // await channel.consume(
      //   queue,
      //   (msg) => {
      //     console.log(msg)
      //   },
      //   {
      //     noAck: true
      //   }
      // )
      const nameExchange = 'booking'
      await channel.assertExchange(nameExchange, 'fanout', { durable: false })
      const { queue } = await channel.assertQueue('', { exclusive: true })
      console.log(queue)
      await channel.bindQueue(queue, nameExchange, '')
      await channel.consume(
        queue,
        (msg) => {
          console.log(msg)
        },
        {
          noAck: true
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
}

const rabbitMQService = new RabbitMQService()
export default rabbitMQService
