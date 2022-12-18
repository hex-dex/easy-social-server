const express = require("express");
const { createServer } = require("http");
const app = express();

const routes = require("./api");
const config = require("./config");
const chat = require("./websockets/chat");

const PORT = process.env.PORT || 3000;

config(app);
routes(app);

const httpServer = createServer(app);

httpServer.on("upgrade", (request, socket, head) => {
  if (request.url === "/chat") {
    chat.handleUpgrade(request, socket, head, function done(ws) {
      chat.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

httpServer.listen(PORT);
