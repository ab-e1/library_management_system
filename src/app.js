const express = require("express");
const booksRoute = require("./routes/booksRoute.js");
const membersRoute = require("./routes/membersRoute.js");
const loansRoute = require("./routes/loansRoute.js");
const errorHandler = require("./middleware/errorHandler.js");
const logger = require("./middleware/logger.js");

const app = express();
app.use(express.json());

app.use(logger);

app.use("/api/books", booksRoute);
app.use("/api/members", membersRoute);
app.use("/api/loans", loansRoute);

app.use(errorHandler);

module.exports = app;
