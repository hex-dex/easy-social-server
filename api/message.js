var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const { verifyToken } = require("../service/tokenServices");
const { createMessage, getChatMessages } = require("../model/messagesModal");
const { getFriendUnique } = require("../model/friendsModel");
router.use(bodyParser.json());

router.post("/send-message", async (req, res) => {
  //   const { cookieValue, post_content } = req.body;
  const { username, target_user } = req.body;
  let chatID = await getFriendUnique(username, target_user);
  let msgBody = "Hello my firstMSG";
  createMessage(username, target_user, msgBody, chatID);
  res.send("<h1>Y</h>");
});
router.get("/get-messages", async (req, res) => {
  let chatID = "40392600-3555-4308-82f3-0b1200b7b8a3";
  let resulkt = await getChatMessages(chatID);
  res.send(resulkt);
});
module.exports = router;
