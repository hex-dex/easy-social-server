var express = require("express");
var router = express.Router();

/* GET users listing. */
const testfunc1 = () => {
  console.log("hello world");
};
module.exports = { testfunc1 };
