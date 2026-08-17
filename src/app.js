const express = require("express");
const booksRoute = require("./routes/booksRoute.js");
const membersRoute = require("./routes/membersRoute.js");
const loansRoute = require("./routes/loansRoute.js");
const errorHandler = require("./middleware/errorHandler.js");
const logger = require("./middleware/logger.js");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json());

app.use(logger);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Management System",
      version: "1.0.0",
      description: "A library management API built with Express",
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/books", booksRoute);
app.use("/api/members", membersRoute);
app.use("/api/loans", loansRoute);

app.use(errorHandler);

module.exports = app;
