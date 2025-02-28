const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // console.log("Cookies:", req.cookies); // Log all cookies
    const { token } = req.cookies;
    console.log(token);
    if (!token) {
      return res.status(401).send("Please Login");
    }
    const decodedObj = jwt.verify(token, "DEV@277");

    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = { userAuth };
