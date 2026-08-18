const app = require("./app.js");
const { port } = require("./config/index.js");

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
