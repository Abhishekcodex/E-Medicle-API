const express = require("express");
const cors = require("cors")
const app = express();
const port = 3000;
const customerDetails = require("./routes/customerDetails");
const customerLogin = require("./routes/customerLogin");
const customerLogout = require("./routes/customerLogout");
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/customerDetails", customerDetails);
app.use("/customerLogin", customerLogin); 
app.use("/customerLogout", customerLogout); 
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});