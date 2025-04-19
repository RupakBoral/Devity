const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  PName: {
    type: String,
    required: true,
    maxLength: 25,
  },
  PSkills: {
    type: [String],
    maxLength: 50,
    required: true,
  },
  PDescription: {
    type: String,
    require: true,
    maxLength: 150,
  },
  P_URL: {
    type: String,
  },
  P_GitURL: {
    type: String,
  },
  P_PhotoURL: {
    type: String,
    default:
      "https://img.freepik.com/free-photo/steel-blue-abstract-background-wallpaper-image_53876-104016.jpg",
  },
  project_status: {
    type: String,
    enum: ["Completed", "Ongoing", "Discarded"],
    required: true,
  },
  help_indicator: {
    type: String,
    enum: ["need_help", "no_help"],
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    default: null,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
