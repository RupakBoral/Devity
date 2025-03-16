require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const connectDb = require("./database");
const cookieParser = require("cookie-parser");
const http = require("http");
const initializeSocket = require("./utils/socket.js");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://devity-frontend.onrender.com",
      "http://localhost:5173",
      "http://localhost:8888",
      "13.228.225.19",
      "18.142.128.26",
      "54.254.162.138",
    ],
    credentials: true,
    allowedHeaders: "Content-Type",
    methods: ["GET,POST,PATCH,PUT,DELETE"],
  })
);

const port = process.env.PORT;
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");
const projectRouter = require("./routes/project.js");

// authentication
app.use("/", authRouter);

// profile fetch api
// OR update the user by emailID
app.use("/", profileRouter);

// sending connection request
app.use("/", requestRouter);

// users connection request
app.use("/", userRouter);

// projects
app.use("/", projectRouter);

// socket config
const server = http.createServer(app);
initializeSocket(server);

connectDb()
  .then(() => {
    console.log("Connection is Established");
    server.listen(port, "0.0.0.0", () => {
      console.log("Server is running");
    });
  })
  .catch(() => {
    console.error("Connection not established");
  });
