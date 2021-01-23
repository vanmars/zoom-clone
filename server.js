const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');

// Set Up Views: Using ejs
app.set('view engine', 'ejs');

// Set up public file
app.use(express.static('public'))

// Set Server to Port 3000
server.listen(3000)

// Routes
app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room})
})

// Setting Up What to Handle on Socekt Server
io.on('connection', socket => {
  // Liseten for when someone joins a room
  socket.on('join-room', (roomId, userId) => {
    soceket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)
  })
})