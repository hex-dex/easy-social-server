const express = require("express");
const router = express.Router();
const { addPost } = require("../model/postModel");
router.post("/add-post", (req, res) => {
  addPost();
  res.status(201).send({ status: 201, message: "Post successfully created" });
});
module.exports = router;
