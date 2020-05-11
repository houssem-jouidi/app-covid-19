const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    error: "Not found",
  });
});
app.listen(port, () => {
  console.log(`server running on port: 3000`);
});
