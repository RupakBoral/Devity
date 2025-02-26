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
  },
});

module.exports = ProjectSchema;
