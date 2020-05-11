const http = require("http");
const socketio = require("socket.io")

const server = http.createServer((req, res) => {
  res.end("Server connected!");
});

const io = socketio(server)

io.on("connection", (socket, req) => {
  // emit sends a message from the server.
  // the emit() event string. In our case "welcome", can be any string, but has to match the on() event string on the client side.
  socket.emit("welcome", {data: "Connection successful. Welcome to the 'WebSocket Server'"});

  // message event listens for data coming from the client.
  // the on() listening event name. In this case "message" can be any string, but has to match the emit() event string on the client side .
  socket.on("message", (msg) => {
    console.log("Incoming socket message: ", msg)
  })

  socket.emit("sendies",{things: "lkahdsjklfha"});
});

console.log(io);

server.listen(5050)
