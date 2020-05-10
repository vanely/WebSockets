const http = require("http");
const WebSocket = require("ws");

// node server  
const server = http.createServer((req, res) => {
  res.end("We're connected");
});

console.log('Server: ', server);
// takes a configuration object, and or a created server ^. Refer to ws npm API docs https://www.npmjs.com/package/ws#api-docs
const wss = new WebSocket.Server({server});
wss.on("headers", (headers, req) => {
  console.log("Headers : ", headers); // header shows status 101: switching from HTTP to WebSocket protocol
  // console.log("Headers Request: ", req);
})

wss.on("connection", (ws, req) => {
  // console.log("Connection Request: ", req);
  // WebSocket has send method that allows us to send data to client from Server
  ws.send("Welcome to the socket!");
  // handles incoming data
  ws.on("message", (msg) => {
    console.log("Message From Client: ", msg)
  })
})

console.log("WebSocket Server: ", wss);

server.listen(8000);