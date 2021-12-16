/** @format */
if (process.env.NODE_ENV != "production") require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 4040;

app.use(express.json());

//all api routes here
app.use("/", require("./routes/api"));

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
