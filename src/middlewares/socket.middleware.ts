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
  socket.on('disconnect', () => {
    console.log(1)
    console.log(`User ${socket.id} disconnected`)
  })

  socket.on('hello', (arg) => {
    console.log(arg) // world
  })
})

export { httpServer, io, app, SOCKET }
