const mysql = require("mysql2");
const conn = mysql.createConnection(process.env.DATABASE_URL);
checkFriendUnique = async function (username, target) {
  res = await conn
    .promise()
    .query(
      `SELECT friendship_unique WHERE src_user = ${username} AND target_user = ${target} OR src_user = ${target} AND target_user = ${username} `
    )
    .then((rows, fields) => {});
};
requestFriend = function (username) {
  console.log();
};
