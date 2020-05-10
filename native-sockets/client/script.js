const ws = new WebSocket("ws://localhost:8000");

// event handler called when WebSocket's ready state changes to OPEN readyState: 1.
ws.onopen = (e) => {
  console.log("Connection Established: ", e);
  ws.send("Connection From Client Established!");
}

// event handler for receiving data from WebSocket server.
ws.onmessage = (e) => {
  console.log("Received Messsage: ", e)
}

console.log(ws);