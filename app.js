const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./utils/config')
const app = express()
const userRouter = require('./controllers/userRouter')
const clickRouter = require('./controllers/clickRouter')
const loginRouter = require('./controllers/loginRouter')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')


mongoose.set('useFindAndModify', false)
logger.info('Connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    logger.info('Connection successful')
  })
  .catch((error) => {
    logger.error('Error in connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)
app.use('/api/click', clickRouter)
app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)


app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>')
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app