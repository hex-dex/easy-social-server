// THIS IS THE SOURCE OF ALL CONTROLLERS (CONTROLLERS ARE FUNCTIONS THAT GET HIT ON AN ENDPORT) IF YOU DONT KNOW WHAT ENDPOINTS ARE THEN FUCK YOU
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

function routes(app) {
  app.use("/user", urlencodedParser, require("./user"));
  app.use("/post", require("./post"));
  app.use("/message", require("./message"));
}

module.exports = routes;
