require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const connectDb = require("./database");
const cookieParser = require("cookie-parser");
const http = require("http");
const initializeSocket = require("./utils/socket.js");
const compression = require("compression");

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
// enable gzip compression
app.use(compression());

// serve React build
app.use(express.static("build"));

app.use(express.json({ limit: "10mb" }));

const port = process.env.PORT;
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");
const projectRouter = require("./routes/project.js");
const communityRouter = require("./routes/community.js");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

// authentication
app.use("/", authRouter);

// profile fetch api
// OR update the user by emailID
app.use("/profile", profileRouter);

// sending connection request
app.use("/request", requestRouter);

// users connection request
app.use("/user", userRouter);
app.use("/feed", userRouter);

// community
app.use("/community/", communityRouter);

// projects
app.use("/", projectRouter);

// 404 handler - must be after all routes
app.use(notFound);

// Error handler - must be last
app.use(errorHandler);

// socket config
const server = http.createServer(app);
initializeSocket(server);

// Initialize database connection
connectDb()
  .then(() => {
    console.log("Connection is Established");
    server.listen(port, "0.0.0.0", () => {
      console.log("Server is running on " + port);
    });
  })
  .catch((err) => {
    console.error("Connection not established", err);
  });
