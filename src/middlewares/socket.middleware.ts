import { createServer } from 'http'
import { Server } from 'socket.io'
import express from 'express'

const app = express()
const httpServer = createServer(app)
let SOCKET: any
const io = new Server(httpServer, {
  /* options */
})

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`)
  SOCKET = socket

  socket.on('driverInfo', (data) => {
    delete data['password']
    console.log(data)
    console.log(data.cusPhone)
    io.emit(`${data.cusPhone}`, data)
  })

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`)
  })

})

export { httpServer, io, app, SOCKET }
