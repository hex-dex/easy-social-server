const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (cookieValue) => {
  const verifyToken = jwt.verify(
    cookieValue,
    process.env.ACCESS_TOKEN,
    (err, data) => {
      return data.username;
    }
  );
  return verifyToken;
};

exports.createAccessToken = (userId, username) => {
  const token = jwt.sign({ id: userId, username }, process.env.ACCESS_TOKEN, {
    expiresIn: "1hr",
  });
  return token;
};
