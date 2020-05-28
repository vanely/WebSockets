const express = require("express");
const socketio = require("socket.io");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + "/public"));

// store a reference to the http server
const expressServer = app.listen(port);
// make the socket server listen to the http server, and set it as our instance of "io". This instantiation can also take a config object
// refer to server docs for options for config https://socket.io/docs/server-api/
const io = socketio(expressServer, {
  path: "/socket.io", // if we look at the html page this is the entry path for the socket.io.js module(can be set to anything)
  serveClient: true, // toggles whether to serve client files or not(our html).
  origins: "*", // origins that are allowed to make a connection to this server(default is any and all).
  wsEngine: "ws", // choose what web socket engine to use. Like a C++ implementation if that's what was being used
});

// listen for "connection". NOTE: this is socket.io specific. listens for connection requests to this server.
io.on("connection", (socket) => {
  // socket param will be our connection. Can listen for incoming data, and send outgoing data.
  socket.emit("messageFromServer", {data: "Welcome to server 3000"});

  socket.on("dataToServer", (dataToServer) => {
    console.log('Data To Server: ', dataToServer);
  })
});