const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const UserModel = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const isAllowedRequests = ["ignored", "interested"];

      const toUser = await UserModel.findById(toUserId);
      if (!toUser) {
        return res.status(404).send("User doesnot exist!");
      }

      if (!isAllowedRequests.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      // if one of the way connection exist
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        // if connection is already present from the receiver end
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "Connection Request already exist",
        });
      }

      // Create a new connection request
      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      // Save the connection request to the database
      connectionRequest.save();
      res.send("Request sent successfully");
    } catch (err) {
      console.error(err);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const loggedInUserId = req.user._id;
      const isAllowedStatus = ["accepted", "rejected"];

      if (!isAllowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUserId,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(400).json({ message: "No request found" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.status(200).json({ message: `Connection Request ${data.status}` });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
);

module.exports = requestRouter;
