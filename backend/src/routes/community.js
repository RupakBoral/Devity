const express = require("express");
const communityRouter = express.Router();
const CommunityModel = require("../models/community");
const { userAuth } = require("../middlewares/auth");

communityRouter.get("/communities", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const communitites = await CommunityModel.find(
      // need changes
      { admin: userId } || { members: userId }
    );
    res.status(200).json({ message: "Success", data: communitites });
  } catch (err) {
    console.log(err);
    res.status(400).json({ Error: err.message });
  }
});

communityRouter.post(
  "/community/request/:community_id",
  userAuth,
  async (req, res) => {
    try {
      const { community_id } = req.params;
      const userId = req.user._id;
      const { role, message } = req.body;

      const community = await CommunityModel.findById(community_id);
      if (!community) {
        throw new Error("Community not found");
      }

      const user = community.members.find((member) => member.userId == userId);
      if (user) {
        throw new Error("Already a member");
      }

      const newMember = { userId, role, message, status: "pending" };
      community.members.push(newMember);

      await community.save();

      res.status(200).json({ message: "Sucess", data: community });
    } catch (err) {
      console.log(err);
      res.status(400).json(err.message);
    }
  }
);

communityRouter.get(
  "/community/requests/:community_id",
  userAuth,
  async (req, res) => {
    try {
      const { community_id } = req.params;

      const { members } = await CommunityModel.findById(community_id).select(
        "members"
      );

      if (!members) {
        throw new Error("Members not found");
      }

      const requests = members.filter((member) => member.status === "pending");

      if (!requests) {
        throw new Error("No requests found");
      }

      res.status(200).json({ message: "Success", data: requests });
    } catch (err) {
      console.log(err);
      res.status(400).json(err.message);
    }
  }
);

module.exports = communityRouter;
