const path = require("path");
const express = require("express");
const controllers = require("./controllers");
const dbconn = require("./config/connection");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

require("dotenv").config();
SESSION_SECRET = process.env.SESSION_SECRET;

const sess = {
  secret: SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: dbconn,
  }),
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
//app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(controllers);

dbconn.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
