const express = require("express");
var cors = require('cors')
const app = express();
const fileupload = require('express-fileupload');

app.use(express.json());
app.use(fileupload());
app.use(cors({
  origin: "*"
}));
app.use(express.urlencoded({ extended: true }));
//Bring in the routes
app.use("/user", require("./routes/user"));
app.use("/props", require("./routes/props"));

app.use(express.static('public'))

//Setup Error Handlers
const errorHandlers = require("./handlers/errorHandler");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;