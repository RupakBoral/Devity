const express = require("express");
const ProjectModel = require("../models/project");
const UserModel = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const { validateProject } = require("../utils/validate");
const projectRouter = express.Router();
projectRouter.use(express.json());
const CommunityModel = require("../models/community");

projectRouter.post("/project/add", userAuth, async (req, res) => {
  try {
    if (!validateProject(req)) {
      throw new Error("Invalid Request");
    }
    const {
      PName,
      PSkills,
      PDescription,
      P_URL,
      P_GitURL,
      P_PhotoURL,
      project_status,
    } = req.body;

    const userId = req.user._id;

    const newProject = new ProjectModel({
      PName,
      PSkills,
      PDescription,
      P_URL,
      P_GitURL,
      P_PhotoURL,
      help_indicator: "no_help",
      project_status,
      userId,
    });

    const savedProject = await newProject.save();
    // Add project ID to user
    await UserModel.findByIdAndUpdate(userId, {
      $push: { projects: savedProject._id },
    });

    res.status(200).json({ message: "Success", data: savedProject });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
});

projectRouter.get("/user/projects/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const projects = await UserModel.findById(_id)
      .populate("projects")
      .select("projects");

    res.status(200).json({ message: "Success", data: projects });
  } catch (err) {
    res.status(400).json({ err });
  }
});

projectRouter.patch(
  "/project/:project_id/update",
  userAuth,
  async (req, res) => {
    try {
      if (!validateProject) {
        throw new Error("Invalid request");
      }
      const { project_id } = req.params;
      const project = await ProjectModel.findById(project_id);
      const {
        PName,
        help_indicator,
        rolesRequired,
        skillsRequired,
        requirements,
      } = req.body;
      Object.keys(req.body).forEach((key) => {
        project[key] = req.body[key];
      });
      await project.save();

      // community changes
      if (help_indicator === "need_help") {
        const community = await CommunityModel.findOne({
          projectId: project_id,
        });

        // check if community exist or not
        if (community) {
          Object.keys(req.body).forEach((key) => {
            community[key] = req.body[key];
          });
          community.name = PName;
          await community.save();
        } else {
          const newCommunity = new CommunityModel({
            projectId: project_id,
            requirements,
            rolesRequired,
            skillsRequired,
            communityName: PName,
            admin: req.user._id,
          });
          await newCommunity.save();
          project.communityId = newCommunity._id;
          await project.save();
        }
      }

      res.status(200).json({ message: "Success", data: project });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
);

projectRouter.delete(
  "/project/:project_id/delete",
  userAuth,
  async (req, res) => {
    try {
      const userId = req.user._id;
      const _id = req.params.project_id;
      const user = await UserModel.findById(userId);
      const projects = user.projects.filter((id) => !id.equals(_id));
      user.projects = projects;
      await user.save();
      await ProjectModel.deleteOne({ _id });
      res.status(200).json({ message: "Successfully Deleted" });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
);

projectRouter.get("/projects", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id;
    let projects = await ProjectModel.find({ help_indicator: "need_help" });
    projects = projects.filter((project) => !project.userId.equals(userId));
    res.status(200).json({ data: projects, message: "Data sent successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error occured" + err });
  }
});

module.exports = projectRouter;
