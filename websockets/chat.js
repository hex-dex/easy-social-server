const { WebSocketServer } = require("ws");

const chat = new WebSocketServer({ noServer: true });

chat.on("connection", (ws) => {
  ws.on("message", (data) => {
    console.log("message", JSON.parse(data.toString()));
  });
  ws.on("disconnect", () => {
    console.log("user disconnected");
  });
  ws.send("test");
});

module.exports = chat;
