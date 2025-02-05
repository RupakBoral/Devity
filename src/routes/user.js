const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequestModel = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // find returns an array of connection requests
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUserId,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    // populate works with ref, where ref is the model it is related/linked to

    const data = connectionRequests.map((row) => row.fromUserId);

    if (data.length === 0) {
      return res.status(400).json({ message: "No Request found" });
    }
    res.status(200).json({ message: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  const loggedInUserId = req.user._id;

  const ConnectionsEstablished = await ConnectionRequestModel.find({
    $or: [{ fromUserId: loggedInUserId }, { toUserId: loggedInUserId }],
    status: "accepted",
  })
    .populate("fromUserId", USER_SAFE_DATA)
    .populate("toUserId", USER_SAFE_DATA);

  if (ConnectionsEstablished.length === 0) {
    return res.status(400).json({ message: "No conneciton found" });
  }

  //   handle the case when fromUserId is the loggedInUser
  const data = ConnectionsEstablished.map((row) => {
    if (row.fromUserId._id.equals(loggedInUserId.toString())) {
      return row.toUserId;
    } else return row.fromUserId;
  });

  res.status(200).json({ data });
});

module.exports = userRouter;
