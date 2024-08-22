const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes");
// const router = require("./rou")
const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
