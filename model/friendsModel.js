const mysql = require("mysql2");
const conn = mysql.createConnection(process.env.DATABASE_URL);
const { v4: uuidv4 } = require("uuid");

const getTargetToFriendStatus = async function (username, target_user) {
  res = await conn
    .promise()
    .query(
      `SELECT * from friends WHERE src_user= '${target_user}' AND target_user = '${username}'  `
    )
    .then(([rows, fields]) => {
      if (rows.length == 1) return rows[0].status;
      return "NONE";
    });
  return res;
};

const getFriendToTargetStatus = async function (username, target_user) {
  res = await conn
    .promise()
    .query(
      `SELECT * from friends WHERE src_user = '${username}' AND target_user = '${target_user}' `
    )
    .then(([rows, fields]) => {
      if (rows.length == 1) return rows[0].status;
      return "NONE";
    });
  return res;
};

const getFriendUnique = async function (username, target_user) {
  res = await conn
    .promise()
    .query(
      `SELECT friendship_unique from friends WHERE src_user = '${username}' AND target_user = '${target_user}' OR src_user = '${target_user}' AND target_user = '${username}' `
    )
    .then(([rows, fields]) => {
      if (rows.length) return rows[0].friendship_unique;
      return "";
    });
  return res;
};

const requestFriend = async function (username, target_user) {
  let UUID = uuidv4();
  let date = new Date();

  const friendToTargetStatus = await getFriendToTargetStatus(
    username,
    target_user
  );
  const targetToFriendStatus = await getTargetToFriendStatus(
    username,
    target_user
  );

  if (targetToFriendStatus == "NONE" && friendToTargetStatus == "NONE") {
    const res = await conn
      .promise()
      .query(
        `INSERT INTO friends (src_user,target_user,status,friendship_unique,created_at,updated_at) VALUES( '${username}', '${target_user}', 'PENDING', '${UUID}', '${date}','${date}')`
      );
    console.log("SENT FRIEND REQUEST");
    return true;
  }
  if (targetToFriendStatus == "PENDING") {
    const friendship_unique = await getFriendUnique(target_user, username);
    acceptRequest(username, target_user, friendship_unique);
    console.log("ACCEPTED FRIEND");
    return true;
  }
  console.log("SOMETHING WENT WRONG");
  return false;
};

const showPendingFriends = async function (username) {
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

const showFriends = async function (username) {
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

const getFriendsRows = async function (friendship_unique) {
  const res = await conn
    .promise()
    .query(
      `SELECT * from friends where friendship_unique = '${friendship_unique}'`
    )
    .then(([rows, fields]) => {
      return rows.length;
    });
  return res;
};

const acceptRequest = async function (
  src_user,
  target_user,
  friendship_unique
) {
  let date = new Date();
  console.log(friendship_unique, " asdasdddasdasd");
  conn
    .promise()
    .query(
      `UPDATE friends SET status = 'ACTIVE', updated_at = '${date}' WHERE src_user = '${target_user}' AND  friendship_unique = '${friendship_unique}' `
    )
    .catch((err) => console.log("UPDATE", err));
  conn
    .promise()
    .query(
      `INSERT INTO friends (src_user,target_user,status,friendship_unique,created_at,updated_at) VALUES( '${src_user}', '${target_user}', 'ACTIVE', '${friendship_unique}', '${date}','${date}')`
    )
    .catch((err) => console.log("INSERT", err));
};
const showOutgoingFriendRequests = async function (myUsername) {
  const res = await conn
    .promise()
    .query(`SELECT * from friends WHERE target_user = '${myUsername}' `)
    .then(([rows, fields]) => {
      return rows;
    });
  return res;
};
module.exports = {
  acceptRequest,
  showFriends,
  showPendingFriends,
  requestFriend,
  showOutgoingFriendRequests,
};
