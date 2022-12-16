var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const {
  userExists,
  isUserAuth,
  addUser,
  getUser,
} = require("../model/userModel");
const {
  requestFriend,
  showPendingFriends,
  showFriends,
  acceptRequest,
  showOutgoingFriendRequests,
} = require("../model/friendsModel");
const { createAccessToken } = require("../service/tokenServices");

router.use(bodyParser.json());

/* GET users listing. */
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  if ((await userExists(username)) == true) {
    return res
      .status(409)
      .send({ status: 409, message: "User already exists" });
  }

  const userId = addUser(username, password, email);
  const token = await createAccessToken(userId, username);
  res.cookie("access-token", token);
  console.log(req.body);
  res.status(201).send({ status: 201, message: "User successfully created" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if ((await isUserAuth(username, password)) == true) {
    const token = await createAccessToken(username);

    res.status(200).send({
      status: 200,
      message: "Login successful",
      accessToken: token,
    });
  } else {
    res.status(401).send({ status: 401, message: "Login unsuccessfull" });
  }
});

router.post("/add-friend", async (req, res) => {
  const { username, targetID } = req.body;
  const targetUser = await getUser(targetID);
  if (!targetUser)
    return res.send({
      status: 404,
      message: "User not found",
    });
  const response = await requestFriend(username, targetUser.username);
  if (!response) {
    return res.send({
      status: 403,
      message: "You have already sent a request!",
    });
  }
  res.send({
    status: 201,
    message: "Friend request sent!",
  });
});

router.post("/show-pending-requests", async (req, res) => {
  const { username } = req.body;
  let results = await showPendingFriends(username);
  res.status(201).send({
    status: 201,
    data: results,
  });
});

router.post("/accept-request", async (req, res) => {
  const { username, friendship_unique, src_user } = req.body;
  acceptRequest(username, friendship_unique, src_user);
  res.send({
    status: 201,
    message: "Friend request added",
  });
});

router.post("/my-friends", async (req, res) => {
  const { username } = req.body;
  let results = await showFriends(username);
  console.log(results);
  res.status(201).send({
    status: 201,
    data: results,
  });
});
router.get("/show-outgoing-requests", async (req, res) => {
  const { username } = req.body;
  let results = await showOutgoingFriendRequests(username);
  console.log(results);
  res.status(201).send({
    status: 201,
    data: results,
  });
});

module.exports = router;
