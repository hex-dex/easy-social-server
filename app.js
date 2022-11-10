const createError = require("http-errors");
const express = require("express");
const apiRouter = require("./api/index");

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
const PORT = 4000;
const saltRounds = 12;
const routes = require("./api");

routes(app, { urlencodedParser });

app.listen(PORT);
