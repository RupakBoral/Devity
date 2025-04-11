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

      const user = community.members.find((member) =>
        member.userId.equals(userId)
      );
      if (community.admin.equals(userId) || user) {
        throw new Error("Already a member");
      }

      // handle multiple requests----

      const newMember = { userId, role, message, status: "pending" };
      community.members.push(newMember);

      await community.save();

      res.status(200).json({ message: "Sucess", data: newMember });
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
      const userId = req.user._id;

      const community = await CommunityModel.findById(community_id);

      if (!community.admin.equals(userId)) throw new Error("Not authorized");
      if (!community) throw new Error("Community not found");

      const { members } = community;

      if (!members) {
        throw new Error("Members not found");
      }

      const requests = members.filter((member) => member.status === "pending");

      if (!requests) {
        throw new Error("No requests found");
      }

      res.status(200).json({ message: "Success", data: requests });
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
);

communityRouter.post(
  "/community/:status/:community_id/:member_id",
  userAuth,
  async (req, res) => {
    try {
      const { status, community_id, member_id } = req.params;
      const userId = req.user._id;

      const community = await CommunityModel.findById(community_id);
      if (!community) {
        throw new Error("Community not found");
      }

      if (community.admin.equals(member_id))
        throw new Error("Cannot review yourself, you are the admin");

      const member = community.members.find((member) =>
        member.userId.equals(member_id)
      );
      if (!member) throw new Error("Member not found");

      member.status = status;
      await community.save();
      res
        .status(200)
        .json({ message: "Successfully reviewed", data: community });
    } catch (error) {
      res.status(400).json({ Error: error.message });
    }
  }
);

communityRouter.get("/community/:community_id", userAuth, async (req, res) => {
  try {
    const { community_id } = req.params;
    const community = await CommunityModel.findById(community_id);

    if (!community) throw new Error("No community found");

    const activeMembers = community.members.filter(
      (member) => member.status === "accepted"
    );
    if (!activeMembers) throw new Error("No members found");

    res.status(200).json({ message: "Success", data: activeMembers });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

module.exports = communityRouter;
