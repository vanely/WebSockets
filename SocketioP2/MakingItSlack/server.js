const express = require('express');
const socketio = require('socket.io');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const server = app.listen(port);
const io = socketio(server);

io.on('connection', (socket) => {
  // socket.on("msgFromClient", (msg) => {
  //   console.log("Message From Client: ", msg);
  //   socket.emit("msgFromServer", {text: msg.text});
  // });

  socket.on("clientChatMsg", (msg) => {
    console.log("Client Message: ", msg);
    socket.emit("serverChatMsg", {text: msg.text});
  });
});
