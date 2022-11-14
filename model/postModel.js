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

// Execute a query

// Run the async function
exports.getAllPost = async () => {
  const showItems = await client.execute(`SELECT * FROM useractivities.posts`);
  return showItems.rows;
};
exports.addPost = async (username, content) => {
  UUID = uuidv4();
  const addItem = await client.execute(
    `INSERT INTO useractivities.posts (post_ID, source_ID, post_content, date_created) VALUES ('${UUID}', '${username}', '${content}', '${new Date()}');`
  );
  addItem;
};
//get posts
