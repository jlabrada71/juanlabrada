// server.js
const express = require('express')
const path = require('path')
const createError = require('http-errors')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const result = require('dotenv').config({ path: `${__dirname}/.env` })

const app = express()
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// the lines below change express app to support socketio communication
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})
// socketio setup end (also this need to change the app.listen by server.listen - see below)

// cors documentation
// https://expressjs.com/en/resources/middleware/cors.html
app.use(express.static(path.join(__dirname, 'dist')))
app.use(require('connect-history-api-fallback')())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  console.log('mensaje de error')
  console.log(err)
  console.log(req)
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

const port = process.env.PORT || 5001

// remainig socketio - setup
io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
    socket.broadcast.emit('chat message', msg)
    // io.emit('chat message', msg);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => {
  console.log(`server started ${port}`)
})

module.exports = app
