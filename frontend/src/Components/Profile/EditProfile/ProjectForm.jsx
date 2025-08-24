/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { compressBase64 } from "../../../utils/constants";
import { updateNewProject } from "../../../utils/projectSlice";
import { useDispatch } from "react-redux";
import uploadImage from "../../../utils/uploadImage";
import handleChange from "../../../utils/handleChange";

const ProjectForm = ({ updateThisProject, setBtn }) => {
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({
    PName: "",
    PDescription: "",
    PSkills: "",
    P_URL: "",
    P_GitURL: "",
    P_PhotoURL: "",
    Requirements: "",
    RolesRequired: "",
    SkillsRequired: "",
    project_status: "",
    help_indicator: "need_help",
  });
  const [upload_status, setUpload_status] = useState("Upload photo");

  const dispatch = useDispatch();

  const _id = updateThisProject?._id;

  useEffect(() => {
    if (updateThisProject) {
      setFormData({
        PName: updateThisProject.PName || "",
        PDescription: updateThisProject.PDescription || "",
        PSkills: updateThisProject.PSkills || "",
        P_URL: updateThisProject.P_URL || "",
        P_GitURL: updateThisProject.P_GitURL || "",
        P_PhotoURL: updateThisProject.P_PhotoURL || "",
        Requirements: updateThisProject.Requirements || "",
        RolesRequired: updateThisProject.RolesRequired || "",
        SkillsRequired: updateThisProject.SkillsRequired || "",
        project_status: updateThisProject.project_status || "",
        help_indicator: updateThisProject.help_indicator || "need_help",
      });
    }
  }, [updateThisProject]);

  const handlePhotoUpload = async (e) => {
    e.preventDefault();

    const fileInput = e.target.elements["P_PhotoURL"];
    const file = fileInput?.files[0];
    if (!file) {
      setErr("No file selected");
      return;
    }

    try {
      setUpload_status("Uploading...");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const compressedBase64 = await compressBase64(reader.result);
          const secure_url = await uploadImage(compressedBase64, setErr);

          setFormData((prev) => ({ ...prev, P_PhotoURL: secure_url }));
          dispatch(
            updateNewProject(_id, {
              ...formData,
              P_PhotoURL: secure_url,
            })
          );
          setUpload_status("Uploaded");
        } catch (error) {
          console.error(error);
          setErr("Image upload failed");
        } finally {
          setTimeout(() => setErr(""), 2000);
        }
      };
    } catch (error) {
      console.error(error);
      setErr("Unexpected error");
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/project/${_id}/update`,
        formData,
        { withCredentials: true }
      );
      dispatch(updateNewProject(_id, res?.data?.data));
    } catch (err) {
      setErr(err);
    } finally {
      setTimeout(() => {
        setErr("");
        setBtn(false);
      }, 2000);
    }
  };

  if (!updateThisProject) return <p>Loading</p>;

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        type="text"
        name="PName"
        value={formData.PName}
        onChange={(e) => handleChange(e, setFormData)}
        placeholder="Project Name"
        className="input"
      />
      <textarea
        placeholder="Description"
        name="PDescription"
        value={formData.PDescription}
        onChange={(e) => handleChange(e, setFormData)}
        className="textarea h-20 placeholder:text-primary"
      ></textarea>
      <input
        type="text"
        name="PSkills"
        value={formData.PSkills}
        onChange={(e) => handleChange(e, setFormData)}
        placeholder="Skills"
        className="input"
      />
      <input
        type="text"
        name="P_URL"
        value={formData.P_URL}
        onChange={(e) => handleChange(e, setFormData)}
        placeholder="Website Link"
        className="input"
      />

      <div>
        <label className="block font-bold">Project Photo</label>
        <form onSubmit={handlePhotoUpload}>
          <input
            type="file"
            name="P_PhotoURL"
            className="file-input w-4/5"
            accept=".jpg, .jpeg, .png, .webp"
          />
          <button className="btn btn-secondary" type="submit">
            {upload_status}
          </button>
        </form>
      </div>

      <input
        type="text"
        name="P_GitURL"
        value={formData.P_GitURL}
        onChange={(e) => handleChange(e, setFormData)}
        placeholder="GitHub Repo URL"
        className="input"
      />
      <label className="select">
        <span className="label">Project Status</span>
        <select
          name="project_status"
          value={formData.project_status}
          onChange={(e) => handleChange(e, setFormData)}
        >
          <option value="">-- Select --</option>
          <option value="Completed">Completed</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Discarded">Discarded</option>
        </select>
      </label>

      <label className="select">
        <span className="label">Help Indicator</span>
        <select
          name="help_indicator"
          value={formData.help_indicator}
          onChange={(e) => handleChange(e, setFormData)}
        >
          <option value="need_help">Need Help</option>
          <option value="no_help">No Help Needed</option>
        </select>
      </label>

      <input
        type="text"
        name="Requirements"
        value={formData.Requirements}
        onChange={(e) => handleChange(e, setFormData)}
        placeholder="Requirements"
        className="input"
      />
      <input
        type="text"
        name="RolesRequired"
        value={formData.RolesRequired}
        onChange={(e) => handleChange(e, setFormData)}
        placeholder="Roles Required"
        className="input"
      />
      <input
        type="text"
        name="SkillsRequired"
        value={formData.SkillsRequired}
        onChange={(e) => handleChange(e, setFormData)}
        placeholder="Skills Required"
        className="input"
      />

      <div className="w-1/2 flex justify-around">
        <button
          onClick={() => setBtn(false)}
          type="button"
          className="btn btn-soft btn-error border border-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          type="submit"
          className="btn btn-soft btn-success border border-gray-300"
        >
          Save
        </button>
      </div>
      <p className="font-semibold text-lg text-center mt-5 text-red-500">
        {err}
      </p>
    </div>
  );
};

export default ProjectForm;
