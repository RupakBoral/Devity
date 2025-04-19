/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { compressBase64 } from "../../../utils/constants";
import { updateNewProject } from "../../../utils/projectSlice";
import { useDispatch } from "react-redux";

const ProjectForm = ({ updateThisProject, setBtn }) => {
  console.log(updateThisProject);
  const [err, setErr] = useState("");
  const [PName, setPName] = useState(updateThisProject.PName);
  const [PDescription, setPDescription] = useState(
    updateThisProject.PDescription
  );
  const [PSkills, setPSkills] = useState(updateThisProject.PSkills);
  const [P_URL, setP_URL] = useState(updateThisProject.P_URL);
  const [P_GitURL, setP_GitURL] = useState(updateThisProject.P_GitURL);
  const [P_PhotoURL, setP_PhotoURL] = useState(updateThisProject.P_PhotoURL);
  const [requirements, setRequirements] = useState(
    updateThisProject?.Requirements
  );
  const [rolesRequired, setRolesRequired] = useState(
    updateThisProject?.RolesRequired
  );
  const [skillsRequired, setSkillsRequired] = useState(
    updateThisProject?.SkillsRequired
  );
  const [project_status, setProject_Status] = useState(
    updateThisProject.project_status
  );
  const [help_indicator, setHelp_indicator] = useState(
    updateThisProject.help_indicator
  );

  // dispatch update project action
  const dispatch = useDispatch();

  if (updateThisProject === null || updateThisProject.length === 0)
    return <p>Loading</p>;

  const _id = updateThisProject._id;

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Convert to Base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const compressedBase64 = await compressBase64(reader.result, 500, 0.4); // Reduce width & quality
        setP_PhotoURL(compressedBase64);
      } catch (err) {
        setTimeout(() => {
          setErr(err);
        }, 2000);
      }
    };
  };

  const handleSubmit = async () => {
    try {
      const body = {
        PName,
        PDescription,
        PSkills,
        P_GitURL,
        P_PhotoURL,
        P_URL,
        project_status,
        help_indicator,
        requirements,
        rolesRequired,
        skillsRequired,
      };
      const res = await axios.patch(BASE_URL + `/project/${_id}/update`, body, {
        withCredentials: true,
      });
      dispatch(updateNewProject(_id, res?.data?.data));
      setBtn(false);
      //   console.log(res?.data?.data);
    } catch (err) {
      setErr(err);
      setTimeout(() => {
        setErr("");
      }, 2000);
    }
  };

  return (
    updateThisProject !== null &&
    updateThisProject.length !== 0 && (
      <div className="flex flex-col items-center gap-3">
        <input
          type="text"
          value={PName}
          onChange={(e) => setPName(e.target.value)}
          placeholder="Project Name"
          className="input"
        />
        <textarea
          placeholder="Description"
          value={PDescription}
          onChange={(e) => setPDescription(e.target.value)}
          className="textarea h-20 placeholder:text-primary"
        ></textarea>
        <input
          type="text"
          value={PSkills}
          onChange={(e) => setPSkills(e.target.value)}
          placeholder="Skills"
          className="input"
        />
        <input
          type="text"
          value={P_URL}
          onChange={(e) => setP_URL(e.target.value)}
          placeholder="Website Link"
          className="input"
        />
        <div>
          <label className="block font-bold">Profile Photo</label>
          <input
            onChange={(e) => handlePhotoUpload(e)}
            type="file"
            className="file-input"
          />
        </div>
        <input
          type="text"
          value={P_GitURL}
          onChange={(e) => setP_GitURL(e.target.value)}
          placeholder="GitHub Repo URL"
          className="input"
        />
        <label className="select">
          <span className="label">Project Status</span>
          <select
            onChange={(e) => setProject_Status(e.target.value)}
            defaultChecked={project_status}
          >
            <option>Completed</option>
            <option>Ongoing</option>
            <option>Discarded</option>
          </select>
        </label>

        <label className="select">
          <span className="label">Help Indicator</span>
          <select
            onChange={(e) => setHelp_indicator(e.target.value)}
            defaultChecked={help_indicator}
          >
            <option>Need Help</option>
            <option>No Help Needed</option>
          </select>
        </label>

        <input
          type="text"
          value={P_GitURL}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="Requirements"
          className="input"
        />

        <input
          type="text"
          value={P_GitURL}
          onChange={(e) => setRolesRequired(e.target.value)}
          placeholder="Roles Required"
          className="input"
        />

        <input
          type="text"
          value={P_GitURL}
          onChange={(e) => setSkillsRequired(e.target.value)}
          placeholder="Skills Required"
          className="input"
        />

        <div className="w-1/2 flex justify-around">
          <button
            onClick={() => setBtn(false)}
            type="submit"
            className="btn btn-soft btn-error border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              handleSubmit();
              setBtn(false);
              e.preventDefault();
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
    )
  );
};

export default ProjectForm;
