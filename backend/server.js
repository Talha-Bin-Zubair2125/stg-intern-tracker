const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const ConnectDB = require("./db");
const AuthRoute = require("./routes/Supervisor_Auth_Route");
const Supervisor_Routes = require("./routes/Supervisor_Auth_Route");
const interneeAuthRoute = require("./routes/Internee_Auth_Route");
const reportRoute = require("./routes/Report_Route");
const commentRoute = require("./routes/Comment_Route");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// For Debugging
const PORT = process.env.PORT;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

app.use(cookieParser(COOKIE_SECRET));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
ConnectDB();

app.use("/uploads", express.static("uploads"));
app.use("/api/auth", AuthRoute);
app.use("/api/add-internee", Supervisor_Routes);
app.use("/api/get", Supervisor_Routes);
app.use("/api/delete", Supervisor_Routes);
app.use("/api/internee", interneeAuthRoute);
app.use("/api/report", reportRoute);
app.use("/api/comment", commentRoute);

app.get("/", (req, res) => {
  res.send("Server is Running!");
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
