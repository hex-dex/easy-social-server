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
const jwt = require("jsonwebtoken");
const { testfunc1 } = require("./api/users");
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

const isUserAuth = async (username, password) => {
  const user = await conn
    .promise()
    .query(
      `SELECT username, password from users WHERE username = '${username}'`
    )
    .then(([rows, fields]) => {
      return rows;
    });
  const isAuth = bcrypt.compareSync(password, user[0].password);
  return isAuth;
};
const createAccessToken = async (username) => {
  const getUUID = await conn
    .promise()
    .query(`SELECT id, username from users WHERE username = '${username}'`)
    .then(([rows, fields]) => {
      return rows[0];
    });
  const tokenGen = (userID, username) => {
    const token = jwt.sign({ id: userID, username }, process.env.ACCESS_TOKEN, {
      expiresIn: "10m",
    });
    return token;
  };
  return tokenGen(getUUID.username, getUUID.id);
};
const test = "Jamie";
app.post("/register", urlencodedParser, async (req, res) => {
  const { username, password } = req.body;
  if ((await userExists(test)) == true) {
    res.status(409).send({ status: 409, message: "User already exists" });
  }
  addUser("Jamie", "asasdasd", "YoolaBoy123");
  res.send("hello");
});
app.post("/login", urlencodedParser, async (req, res) => {
  // const { testfunc1 } = testfunc;
  testfunc1();
  if ((await isUserAuth(test, "asasdasd")) == true) {
    console.log("yippy");
    const testy = await createAccessToken(test);

    console.log(testy);
  }
  res.send("hello - login");
});
// error handler

app.listen(PORT);
