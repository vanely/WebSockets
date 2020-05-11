const socket = io("http://localhost:5050");

// initiate socket connection to specified server
socket.on("connect", (data) => {
  // listens for a welcome(message) to be received 
  // the on() event string. In our case "welcome" can be any string, but has to match the emit() event string on the server side.
  socket.on("welcome", (message) => { 
    console.log("Message from server", message);
  });

  // emit is again used to send data via an object to the server
  // the emit() event string. In our case "message" can be any string, but has to match the on() event string on the server side
  socket.emit('message', {data: "Hello from the client side of things!"});
})
console.log(socket)