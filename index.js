const express = require('express')
const app = express()
const server = require('http').createServer(app)
const path = require('path')
const PORT = process.env.PORT || 5000
const io = require('socket.io').listen(server)


  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('index'))
  server.listen(PORT, () => console.log(`Listening on ${ PORT }`))

//-----------------------------------------------------------------------------
// Configure web sockets.
//-----------------------------------------------------------------------------
io.sockets.on("connection", function(socket) {

  socket.on("chat-message", function(message) {
      io.sockets.emit("chat-message", message);
  });

});