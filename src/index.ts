import express from 'express'
import userRouter from '~/routes/users.routes'
import bookingRouter from '~/routes/booking.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/errors.middleware'
import cors from 'cors'

import { httpServer, io, app } from '~/middlewares/socket.middleware'

const port = 3000

databaseService.connect()
app.use(cors())
app.get('/', (req, res) => {
  res.send('hello world')
})
app.use(express.json())

app.use('/users', userRouter)
app.use('/booking', bookingRouter)
app.use(defaultErrorHandler)

// Sử dụng httpServer thay cho app.listen
httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
