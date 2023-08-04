import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()

const io = new Server(httpServer, {
  /* options */
})

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`)

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`)
  })

  socket.on('hello', (arg) => {
    console.log(arg) // world
  })
})

export { httpServer, io }
