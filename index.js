const express = require("express");
const mongooes = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
dotenv.config();
mongooes
  .connect(process.env.MOGOOSE_URL)
  .then(() => console.log("Connect DB successfull"))
  .catch((err) => console.log(err));

const app = express();
app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend");
});
