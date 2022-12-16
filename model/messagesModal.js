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
const createMessage = async (fromUser, toUser, msgBody, chatID) => {
  let date = new Date();
  const createMsg = await client.execute(
    `INSERT INTO useractivities.messages (sent_from,sent_to,msg_body,created,chat_id) VALUES('${fromUser}','${toUser}','${msgBody}','${date}','${chatID}')`
  );
};
const getChatMessages = async (chatID) => {
  const showItems = await client.execute(
    `SELECT * FROM useractivities.messages WHERE chat_id = '${chatID}'`
  );
  console.log(showItems.rows);
  return showItems.rows;
};
module.exports = {
  createMessage,
  getChatMessages,
};
