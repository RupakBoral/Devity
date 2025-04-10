const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
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
