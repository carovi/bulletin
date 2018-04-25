var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
const db = require('./database')

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.use(express.static('build'))

io.on('connection', function(socket){
  socket.on('color change', function(color) {
    socket.broadcast.emit('color change', color)
  })

  socket.on('note:add', function({content, author}) {
    db.createNote(app.connection, author, content, (err, res) => {
      if (err) {
        console.error(err)
      } else {
        console.log(res)
      }
    })
  })
})

db.setup((err, connection) => {
  if (err) {
    console.error(err)
    process.exit(1)
    return
  }
  app.connection = connection
  http.listen(3000, () => {
    console.log('listening on *:3000')
  })
})