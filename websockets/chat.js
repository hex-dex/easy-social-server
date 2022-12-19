const { WebSocketServer, WebSocket } = require("ws");
const { v4: uuidv4 } = require("uuid");

const chat = new WebSocketServer({ noServer: true });
const rooms = {};

chat.on("connection", (socket) => {
  socket.id = uuidv4();

  socket.on("message", function (data) {
    const { message, room } = JSON.parse(data);
    // const rooms = {12321: {unique: ws}}
    if (!rooms[room]) rooms[room] = {};
    rooms[room] = { ...rooms[room], [socket.id]: socket };
    console.log(rooms[room]); // join the room

    Object.values(rooms[room]).forEach((client) => {
      if (client != socket && client.readyState === WebSocket.OPEN) {
        client.send(`Got ur msg` + data);
      }
    });
  });
});

module.exports = chat;
