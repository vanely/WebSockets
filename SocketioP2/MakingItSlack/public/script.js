const socket = io("http://localhost:3000");

const chatMessages = document.querySelector('.chat-messages');
const messageForm = document.querySelector('.chat-message-entry');
const messageInput = document.querySelector('.message-input');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const chatMessage = messageInput.value;
  if (chatMessage) {
    socket.emit("clientChatMsg", {text: chatMessage});
    messageInput.value = '';
  }
});

socket.on("serverChatMsg", (msg) => {
  const newMessageElement = document.createElement('li');
  newMessageElement.textContent = msg.text;
  chatMessages.appendChild(newMessageElement);
});

// socket.emit("msgFromClient", { text: "Hello from the client" });
// socket.on("msgFromServer", (msg) => {
//   console.log("Message From Server: ", msg);
// });