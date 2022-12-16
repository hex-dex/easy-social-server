const { Client } = require("cassandra-driver");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const client = new Client({
  cloud: {
    secureConnectBundle: "./secure-connect-posts.zip",
  },
  credentials: {
    username: `${process.env.clientID}`,
    password: `${process.env.clientSecret}`,
  },
});
const createPost = async (fromUser, toUser, msgBody, chatID) => {
  let date = new Date();
  const showItems = await client.execute(
    `INSERT INTO useractivities.messages (sent_from,sent_to,msg_body,created,chat_id) VALUES('${fromUser}','${toUser}','${msgBody}','${date}','${chatID}')`
  );
  //   return showItems.rows;
};
module.exports = {
  createPost,
};
