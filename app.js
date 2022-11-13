const createError = require("http-errors");
const express = require("express");
const apiRouter = require("./api/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const corsOptions = {
  origin: "http://127.0.0.1:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = express();
const PORT = 4000;
const routes = require("./api");

app.use(cors(corsOptions));
routes(app, { urlencodedParser });

app.listen(PORT);
