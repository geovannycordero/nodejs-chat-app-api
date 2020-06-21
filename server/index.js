const http = require('http')
const cors = require('cors')
const logger = require('morgan')
const express = require('express')
const socketio = require('socket.io')

const mongo = require('./config/mongo.js')
const webSockets = require('./utils/webSockets')

const indexRouter = require('./routes/index.js')
const userRouter = require('./routes/user.js')
const chatRoomRouter = require('./routes/chatRoom.js')
const deleteRouter = require('./routes/delete.js')

const { decode } = require('./middlewares/jwt.js')

const app = express()

const port = process.env.PORT || '3000'
app.set('port', port)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/room', decode, chatRoomRouter)
app.use('/delete', deleteRouter)

app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesn\'t exist!'
  })
});

const server = http.createServer(app)

/** Create socket connection */
global.io = socketio.listen(server)
global.io.on('connection', webSockets.connection) // i dunno

server.listen(port)
server.on('listening', () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});