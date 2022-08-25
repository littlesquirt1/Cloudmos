const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var cloudvars = []
var cloud = []

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/style.css');
});

app.get('/script.js', (req, res) => {
  res.sendFile(__dirname + '/script.js');
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.broadcast.emit('cloudvar', cloudvars)
  socket.on('cloudvar', (msg) => {
    console.log(msg)
    if (!(cloudvars == msg && msg == null)) {
      cloudvars = msg
      socket.broadcast.emit('cloudvar', msg)
    }
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});