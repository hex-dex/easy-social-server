var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { userExists, isUserAuth } = require("../model/userModel");
const test = "jamie";
/* GET users listing. */
router.post("/register", urlencodedParser, async (req, res) => {
  const { username, password } = req.body;
  if ((await userExists("")) == true) {
    res.status(409).send({ status: 409, message: "User already exists" });
  }
  addUser("Jamie", "asasdasd", "YoolaBoy123");
  res.send("hello");
});

router.post("/login", urlencodedParser, async (req, res) => {
  if ((await isUserAuth(test, "asasdasd")) == true) {
    res.status(200).send({
      status: 200,
      message: "Login successful",
    });
    const testy = await createAccessToken(test);

    console.log(testy);
  } else {
    res.status(401).send({ status: 401, message: "Login unsuccessfull" });
  }
  res.send("hello - login");
});

module.exports = router;
