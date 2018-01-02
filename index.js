var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/main.css', function(req, res) {
  res.sendFile(__dirname + '/main.css')
})

app.get('/colors.js', function(req, res) {
  res.sendFile(__dirname + '/build/bundle.js')
})


io.on('connection', function(socket){
  socket.on('color change', function(color) {
    socket.broadcast.emit('color change', color);
  });
});
    

http.listen(3000, function() {
  console.log('listening on *:3000')
})