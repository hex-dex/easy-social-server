var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const { verifyToken } = require("../service/tokenServices");
const { createPost } = require("../model/messagesModal");
const { getFriendUnique } = require("../model/friendsModel");
router.use(bodyParser.json());

router.post("/send-message", async (req, res) => {
  //   const { cookieValue, post_content } = req.body;
  const { username, target_user } = req.body;
  let chatID = await getFriendUnique(username, target_user);
  let msgBody = "Hello my firstMSG";
  createPost(username, target_user, msgBody, chatID);
  res.send("<h1>Y</h>");
});
module.exports = router;
