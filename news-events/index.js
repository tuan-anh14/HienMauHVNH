const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const bodyParser = require("body-parser");

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const database = require("./config/database");
const systemConfig = require("./config/system");
const flash = require("express-flash");
const session = require("express-session")
const cookieParser = require("cookie-parser")

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride("_method"));

database.connect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Flash
app.use(cookieParser("KNDSLFLLLJ"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//End Flash

// Route
route(app);
routeAdmin(app);

// App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
