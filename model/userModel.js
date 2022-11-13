const mysql = require("mysql2");
require("dotenv").config();
const conn = mysql.createConnection(process.env.DATABASE_URL);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.userExists = async (username) => {
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
exports.addUser = async (username, password, email) => {
  let noErr = true;
  let saltRounds = 12;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  const id = await conn
    .promise()
    .query(
      `INSERT INTO users (username, password, email, date_joined) VALUES ('${username}','${hashedPassword}','${email}', '${new Date()}')`
    )
    .then(([rows, fields]) => {
      return rows.insertId;
    });
  return id;
};

exports.isUserAuth = async (username, password) => {
  const user = await conn
    .promise()
    .query(
      `SELECT username, password from users  WHERE username = '${username}'`
    )
    .then(([rows, fields]) => {
      return rows;
    });
  const isAuth = bcrypt.compareSync(password, user[0].password);
  return isAuth;
};

exports.createAccessToken = (userId, username) => {
  const token = jwt.sign({ id: userId, username }, process.env.ACCESS_TOKEN, {
    expiresIn: "10m",
  });
  return token;
};
