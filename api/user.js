var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const {
  userExists,
  isUserAuth,
  addUser,
  createAccessToken,
} = require("../model/userModel");
router.use(bodyParser.json());

/* GET users listing. */
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  console.log(req.body, "<== BODY");
  if ((await userExists(username)) == true) {
    return res
      .status(409)
      .send({ status: 409, message: "User already exists" });
  }

  const userId = addUser(username, password, email);
  const token = await createAccessToken(userId, username);
  res.cookie("access-token", token);
  res.status(201).send({ status: 201, message: "User successfully created" });
});

router.post("/login", urlencodedParser, async (req, res) => {
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
  res.send("hello - login");
});

module.exports = router;
