const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
  communityName: {
    type: String,
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
    unique: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rolesRequired: {
    type: String,
  },
  skillsRequired: {
    type: String,
  },
  requirements: {
    type: String,
  },
  members: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: String,
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
      message: String,
    },
  ],
});

module.exports = mongoose.model("Community", CommunitySchema);
