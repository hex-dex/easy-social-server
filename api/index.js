// THIS IS THE SOURCE OF ALL CONTROLLERS (CONTROLLERS ARE FUNCTIONS THAT GET HIT ON AN ENDPORT) IF YOU DONT KNOW WHAT ENDPOINTS ARE THEN FUCK YOU
function routes(app, { urlencodedParser }) {
  app.use("/user", require("./user"));
  app.use("/post", require("./post"));
}

module.exports = routes;
