const cors = require("cors");
const corsOptions = {
  origin: ["http://127.0.0.1:5173"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = (app) => {
  app.use(cors(corsOptions));
};
