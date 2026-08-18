const express = require("express");
const booksRoute = require("./routes/booksRoute.js");
const membersRoute = require("./routes/membersRoute.js");
const loansRoute = require("./routes/loansRoute.js");
const authRoute = require("./routes/authRoute.js");
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
    components: {
      schemas: {
        Book: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            author: { type: "string" },
            genre: { type: "string" },
            year: { type: "integer" },
            copies: { type: "integer" },
            availableCopies: { type: "integer" },
          },
        },
        Member: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            email: { type: "string" },
            registeredAt: { type: "string", format: "date-time" },
          },
        },
        Loan: {
          type: "object",
          properties: {
            id: { type: "integer" },
            memberId: { type: "integer" },
            bookId: { type: "integer" },
            borrowedAt: { type: "string", format: "date-time" },
            dueAt: { type: "string", format: "date-time" },
            returnedAt: { type: "string", format: "date-time", nullable: true },
            status: { type: "string", enum: ["borrowed", "returned"] },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/books", booksRoute);
app.use("/api/members", membersRoute);
app.use("/api/loans", loansRoute);
app.use("/api/auth", authRoute);

app.use(errorHandler);

module.exports = app;
