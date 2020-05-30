const express = require("express");
const socketio = require("socket.io");

const port = process.env.PORT || 3300;
const app = express();

app.use(express.static(__dirname + "/public"));

// store a reference to the http server
const expressServer = app.listen(port);
// make the socket server listen to the http server, and set it as our instance of "io". This instantiation can also take a config object
// refer to server docs for options for config https://socket.io/docs/server-api/
const io = socketio(expressServer, {
  path: "/socket.io", // if we look at the html page this is the entry path for the socket.io.js module(can be set to anything)
  serveClient: true, // toggles whether to serve client files or not(our html).
  wsEngine: "ws", // choose what web socket engine to use. Like a C++ implementation if that's what was being used
});

// listen for "connection". NOTE: this is socket.io specific. listens for connection requests to this server.
// all socket.io connections are open on a namespace. This can be an explicitly specified namespace, or default such as this case. our main connection.
// a namespace is a pool of sockets connected under a given scope(similar to channesl in slack, or discord), and all of the events for listening for data back and forth, from client to server and vise versa are bound to these namespaces.
// always connected to "/", but have to option to connect to others
// the instance of socket in the callback inside always belongs to a namespace. That has of the data moving through it bound to that given namespace(default namespace is "/")
// each namespace can have arbitrary channels, called rooms, which the namespace socket instance, and join and leave 

// io.on() === io.of('/').on() -> the of() method specifies the name space that is being used
io.on("connection", (socket) => {
  // socket param will be our connection. Can listen for incoming data, and send outgoing data.
  socket.emit("messageFromServer", {data: "Welcome to server 3000"});

  socket.on("dataToServer", (dataToServer) => {
    console.log('Data To Server: ', dataToServer);
  });

  //---------------------------------------------------------------
  socket.on("newMessageToServer", (msgFromClient) => {
    console.log("Message From Client: ", msgFromClient);

    // using io to emit will send the message to all socket clients connected to this server
    // the reason for this is, is so that the message is displayed to all parties connected to the server
    io.emit("messageToClients", {text: msgFromClient.text});
  })
});

// if we wanted to create a new namespace to send send information through(synonymous with a new slack workspace)
// the channels inside of a workspace would be synonymous with groups within a namespace.
io.of('/newnamespace').on('connection', (socket) => {
  socket.emit("serverMsg", "Boom connected!");
  socket.on("ClientMsg", (msg) => {
    console.log("Client Message On 'newnamespace': ", msg);
  });

  // to join a room inside of a namespace, use the join() method. Join takes an optional callback as a second parameter.
  socket.join('level1');
  // we can now emit data to the room from this namespace
  // using io, instead of socket to broadcast the message, sends it directly from the server, and thus it will reach everyone. 
  // if it is sent using socket.to() then it will reach everyone except where it is being sent from. Given that I'm explicitly invoking it,
  // I wouldn't see it
  io.of('/newnamespace').to('level1').emit('joined', {text: `${socket.id} has joined room 'level1'.`})

  // NOTE: this will not go to the sending socket
  socket.to('level1').emit('joined', {text: 'some text'});

  // can send a private message to a specific socket using that socket's id
  socket.to("a socket's id").emit('someevent', 'some message');
});