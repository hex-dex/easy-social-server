const mysql = require("mysql2");
const conn = mysql.createConnection(process.env.DATABASE_URL);
const { v4: uuidv4 } = require("uuid");

isFriendUnique = async function (username, target) {
  res = await conn
    .promise()
    .query(
      `SELECT friendship_unique from friends WHERE src_user = '${username}' AND target_user = '${target}' OR src_user = '${target}' AND target_user = '${username}' `
    )
    .then(([rows, fields]) => {
      if (rows.length >= 1) {
        return rows[0].friendship_unique;
      } else {
        return false;
      }
    });
  return res;
};
exports.requestFriend = async function (username, srcID) {
  let UUID = uuidv4();
  let date = new Date();
  if ((await isFriendUnique(username, srcID)) == false) {
    const res = await conn
      .promise()
      .query(
        `INSERT INTO friends (src_user,target_user,status,friendship_unique,created_at,updated_at) VALUES( '${username}', '${srcID}', 'PENDING', '${UUID}', '${date}','${date}')`
      );
  } else {
    let friendID = await isFriendUnique(username, srcID);
    const res = await conn
      .promise()
      .query(
        `INSERT INTO friends (src_user,target_user,status,friendship_unique,created_at,updated_at) VALUES( '${username}', '${srcID}', 'PENDING', '${friendID}', '${date}','${date}')`
      );
  }
};
exports.showPendingFriends = async function (username) {
  const res = await conn
    .promise()
    .query(
      `SELECT * from friends WHERE target_user = '${username}' AND status = 'PENDING' `
    )
    .then(([rows, fields]) => {
      return rows;
    });
  return res;
};
exports.showFriends = async function (username) {
  const res = await conn
    .promise()
    .query(
      `SELECT * from friends WHERE target_user = '${username}' AND status = 'ACTIVE' `
    )
    .then(([rows, fields]) => {
      return rows;
    });
  return res;
};
