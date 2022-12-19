const express = require("express");
const { createServer } = require("http");
const app = express();
const { WebSocket } = require("ws");

const routes = require("./api");
const config = require("./config");
const chat = require("./websockets/chat");

const PORT = process.env.PORT || 3000;

config(app);
routes(app);
const myData = "adnan is amazing";
const httpServer = createServer(app);
const rooms = {};
httpServer.on("upgrade", (request, socket, head) => {
  if (request.url === `/chat`) {
    chat.handleUpgrade(request, socket, head, (ws) => {
      chat.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

httpServer.listen(PORT);
