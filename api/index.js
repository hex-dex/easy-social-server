// THIS IS THE SOURCE OF ALL CONTROLLERS (CONTROLLERS ARE FUNCTIONS THAT GET HIT ON AN ENDPORT) IF YOU DONT KNOW WHAT ENDPOINTS ARE THEN FUCK YOU

const userController = require("./user");

function routes(app, { urlencodedParser }) {
  "yur.com/user";
  app.use("/user", userController);
  app.use("/post", userController);
}

module.exports = routes;
