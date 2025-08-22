const express = require("express");
const { userAuth } = require("../middlewares/auth");

const ConnectionRequestModel = require("../models/connectionRequest");
const UserModel = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA =
  "firstName lastName photoUrl about skills BgUrl projects headline age";

userRouter.get("/", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 30 ? 30 : limit;
    const skip = (page - 1) * limit;

    // FEED API will show all users details except myself, accepted, rejected, interested and ignored
    // find all connections requests that user sent or recieved
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");
    // .populate("fromUserId", "firstName")
    // .populate("toUserId", "firstName");

    // don't show these users in users feed
    const HideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      HideUsersFromFeed.add(req.fromUserId.toString());
      HideUsersFromFeed.add(req.toUserId.toString());
    });
    const users = await UserModel.find({
      // find all the users whose id is 'not-in' the HideUserFromFeed set and is not loggedInUser
      $and: [
        { _id: { $nin: Array.from(HideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.status(200).json({ data: users, message: "Responded" });
  } catch (err) {
    res
      .status(400)
      .send(`Error fetching the Feed!!\n ${err}\n Kindly Reload Again`);
  }
});

userRouter.get("/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // find returns an array of connection requests
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUserId,
      status: "interested",
    })
      .select("_id")
      .populate("fromUserId", USER_SAFE_DATA);
    // populate works with ref, where ref is the model it is related/linked to

    // const data = connectionRequests.map((row) => row.fromUserId);

    if (connectionRequests.length === 0) {
      return res.status(200).json({ message: "No Request found" });
    }

    res.status(200).json({ data: connectionRequests });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.get("/connections", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const ConnectionsEstablished = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUserId }, { toUserId: loggedInUserId }],
      status: "accepted",
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    if (ConnectionsEstablished.length === 0) {
      return res.status(200).json({ message: "No conneciton found" });
    }

    //   handle the case when fromUserId is the loggedInUser
    const data = ConnectionsEstablished.map((row) => {
      if (row.fromUserId._id.equals(loggedInUserId.toString())) {
        return row.toUserId;
      } else return row.fromUserId;
    });

    res.status(200).json({ data });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = userRouter;
