const createError = require("http-errors");
const express = require("express");
const app = express();
const apiRouter = require("./api/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { instrument } = require("@socket.io/admin-ui");

const { createServer } = require("http");
const { Server } = require("socket.io");
const corsOptions = {
  origin: [
    "http://127.0.0.1:5173",
    "https://admin.socket.io",
    "https://websocketking.com",
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const PORT = 3000;
const routes = require("./api");

app.use(cors(corsOptions));
routes(app, { urlencodedParser });

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io", "https://websocketking.com"],
    credentials: true,
  },
});
instrument(io, {
  auth: false,
  mode: "development",
});

const admin = io.of("/admin");
admin.on("connection", (socket) => {
  console.log("conn");
});

httpServer.listen(PORT);
