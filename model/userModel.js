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
exports.addUser = (username, password, email) => {
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

exports.isUserAuth = async (username, password) => {
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

exports.createAccessToken = async (username) => {
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
