const createError = require("http-errors");
const express = require("express");
const apiRouter = require("./api/index");
require("dotenv").config();
const mysql = require("mysql2");
const conn = mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to PlanetScale!");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const bcrypt = require("bcrypt");
const app = express();
const PORT = 4000;
const saltRounds = 12;

const userExists = async (username) => {
  const result = await conn
    .promise()
    .query(`SELECT * from users WHERE username = '${username}' `)
    .then(([rows, fields]) => {
      if (rows.length > 0) {
        return true;
      }
      return false;
    });
  return result;
};

const addUser = (username, password, email) => {
  let noErr = true;
  bcrypt.hash(password, saltRounds, (err, data) => {
    conn.query(
      `INSERT INTO users (username,password,email,date_joined) VALUES ('${username}','${data}','${email}', '${new Date()}')`,
      (err, result) => {
        if (err) noErr = false;
      }
    );
  });
  return noErr;
};

app.post("/register", urlencodedParser, async (req, res) => {
  const { username, password } = req.body;
  const test = "Ben13";
  if ((await userExists(test)) == true) {
    res.status(409).send({ status: 409, message: "User already exists" });
  }
  addUser("Jamie", "asasdasd", "YoolaBoy123");
  // conn.query("INSERT stuff in stuff", (err, result) => {
  //   if (!err) res.send({ status: 201, message: "Successfully logged in!" });
  // });

  res.send("hello");
  // const hashedPassword =
  // console.log(data[0]);
});
// error handler

app.listen(PORT);
