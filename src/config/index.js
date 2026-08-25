require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "JWT_SECRET",
  jwtExpiresIn: "7d",
  bcryptRounds: 10,
  loanDurationDays: Number(process.env.LOAN_DURATION_DAYS) || 14,
  databaseUrl: process.env.DATABASE_URL,
};
