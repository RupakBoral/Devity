const express = require("express");
const communityRouter = express.Router();
const CommunityModel = require("../models/community");
const { userAuth } = require("../middlewares/auth");

communityRouter.get("/", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const communitites = await CommunityModel.find(
      // need changes
      { admin: userId } || { members: userId }
    );
    res.status(200).json({ message: "Success", data: communitites });
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }
});

communityRouter.post("/request/:community_id", userAuth, async (req, res) => {
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
      if (user.status === "accepted")
        res.status(200).json({ message: "Already a member" });
      else if (user.status === "pending")
        res
          .status(200)
          .json({ message: "Already requested, wait for approval" });
      else
        res
          .status(200)
          .json({ message: "Rejected, please explore for another projects" });
      return;
    }

    const newMember = { userId, role, message, status: "pending" };
    community.members.push(newMember);

    await community.save();

    res
      .status(202)
      .json({ message: "Request sent successfully", data: newMember });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

communityRouter.get("/requests/:community_id", userAuth, async (req, res) => {
  try {
    const { community_id } = req.params;
    const userId = req.user._id;

    const community = await CommunityModel.findById(community_id).populate(
      "members.userId"
    );

    if (!community) {
      res.status(200).json({ data: "Community not found" });
      return;
    }

    if (!community.admin.equals(userId)) {
      res.status(200).json({ data: "You are not the admin" });
      return;
    }
    const { members } = community;

    if (!members) {
      res.status(200).json({ data: "No members found" });
      return;
    }

    const requests = community.members.filter(
      (member) => member.status === "pending"
    );

    if (!requests) {
      res.status(200).json({ data: "No requests" });
      return;
    }

    res.status(200).json({ message: "Success", data: requests });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

communityRouter.post(
  "/:status/:community_id/:member_id",
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

communityRouter.get("/:community_id/", userAuth, async (req, res) => {
  try {
    const { community_id } = req.params;
    const userId = req.user._id;
    const community = await CommunityModel.findById(community_id);
    if (!community) throw new Error("No community found");

    res.status(200).json({ message: "Success", data: community });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

communityRouter.get("/:community_id/members", userAuth, async (req, res) => {
  try {
    const { community_id } = req.params;
    const community = await CommunityModel.findById(community_id).populate(
      "members.userId"
    );

    if (!community) throw new Error("No community found");

    const activeMembers = community.members.filter(
      (member) => member.status === "accepted"
    );

    res.status(200).json({ message: "Success", data: activeMembers });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

module.exports = communityRouter;
