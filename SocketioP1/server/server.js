const http = require("http");
const socketio = require("socket.io")


const server = http.createServer((req, res) => {
  res.end("Server connected!");
});

const io = socketio(server)

io.on("connection", (socket, req) => {
  socket.emit("Welcomee to the 'WebSocket Server'");
  socket.on("message", (msg) => {
    console.log("Incoming socket message: ", msg)
  })
})
server.listen(5050)