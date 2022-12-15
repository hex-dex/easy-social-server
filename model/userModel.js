const mysql = require("mysql2");
require("dotenv").config();
const conn = mysql.createConnection(process.env.DATABASE_URL);
const bcrypt = require("bcrypt");

const getUser = async (username) => {
  const result = await conn
    .promise()
    .query(`SELECT * from users WHERE username = '${username}' `)
    .then(([rows, fields]) => {
      if (rows.length > 0) {
        return rows[0];
      }
      return "";
    });
  return result;
};

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
const addUser = async (username, password, email) => {
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

const isUserAuth = async (username, password) => {
  const user = await conn
    .promise()
    .query(
      `SELECT username, password from users WHERE username = '${username}'`
    )
    .then(([rows, fields]) => {
      console.log(rows);
      if (rows.length > 0) return rows[0];
      return null;
    });
  if (user == null) {
    return false;
  }
  const isAuth = bcrypt.compareSync(password, user.password);
  return isAuth;
};

module.exports = { getUser, userExists, addUser, isUserAuth };
