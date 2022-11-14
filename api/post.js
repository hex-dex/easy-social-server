const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const { addPost, getAllPost } = require("../model/postModel");
const { createAccessToken, verifyToken } = require("../service/tokenServices");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use(bodyParser.json());

router.post("/", (req, res) => {
  const { cookieValue, post_content } = req.body;
  addPost(verifyToken(cookieValue), post_content);
  res.status(201).send({ status: 201, message: "Post successfully created" });
});
router.get("/", async (req, res) => {
  results = await getAllPost();

  res.status(200).send({ status: 200, data: results });
});
module.exports = router;
