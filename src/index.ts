import express from 'express'
import userRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/errors.middleware'
const app = express()
const port = 3000

databaseService.connect()
app.get('/', (req, res) => {
  res.send('hello world')
})
app.use(express.json())
app.use('/users', userRouter)
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})