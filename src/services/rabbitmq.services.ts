/* eslint-disable @typescript-eslint/no-inferrable-types */
import amqp from 'amqplib'
const amqp_url_cloud = process.env.RABBITMQ_CLOUD as string
// Connection URL
const connectionUrl = 'amqp://localhost'

// Queue name
const queueName = 'myQueue'

class RabbitMQService {
  public messageReceive: string = ''
  async sendMsg({ msg }: { msg: string }) {
    try {
      // Create connection
      const connection = await amqp.connect(connectionUrl)
      const channel = await connection.createChannel()
      await channel.assertQueue(queueName, { durable: true })
      channel.sendToQueue(queueName, Buffer.from(msg), { persistent: true })
      await channel.close()
      await connection.close()
    } catch (error) {
      console.error('Error occurred while publishing message:', error)
    }
  }

  async receiveMsg() {
    try {
      const connection = await amqp.connect(connectionUrl)
      const channel = await connection.createChannel()
      await channel.assertQueue(queueName, { durable: true })
      await channel.consume(
        queueName,
        (msg) => {
          console.log('Received message:', (msg as amqp.Message).content.toString())
          this.messageReceive = (msg as amqp.Message).content.toString()
          channel.ack(msg as amqp.Message)
          channel.close()
        },
        { noAck: false }
      )
    } catch (error) {
      console.error('Error occurred while consuming messages:', error)
    }
  }
}

const rabbitMQService = new RabbitMQService()
export default rabbitMQService
