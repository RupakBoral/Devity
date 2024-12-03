const express = require("express");

const app = express();

app.use("/admin", (req, res, next) => {
  console.log("admin auth is getting checked");
  const token = "abc";
  const isAdminAuthorized = token === "abc";
  if (!isAdminAuthorized) {
    res.status(404).send("Unauthorized request");
  } else {
    next();
  }
  app.get("/admin/getUser", (req, res) => {
    res.send("User data sent");
  });
  app.get("/admin/deleteUser", (req, res) => {
    res.send("User deleted");
  });
});
