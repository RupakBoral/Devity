/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { addProject } from "../../../utils/projectSlice";

const AddProject = ({ setAdd }) => {
  const [err, setErr] = useState();
  const [PName, setPName] = useState("");
  const [PDescription, setPDescription] = useState("");
  const [PSkills, setPSkills] = useState("");
  const [project_status, setProject_Status] = useState("Completed");
  const [help_indicator, setHelp_indicator] = useState("need_help");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const body = {
        PName,
        PDescription,
        PSkills,
        project_status,
        help_indicator,
      };
      const res = await axios.post(BASE_URL + "/project/add", body, {
        withCredentials: true,
      });
      console.log(res);
      // dispatch(addProject(res?.data?.data));
      setAdd(false);
    } catch (err) {
      console.log(err);
      setAdd(true);
      setErr(err);
      setTimeout(() => {
        setErr("");
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        onChange={(e) => setPName(e.target.value)}
        type="text"
        placeholder="Project Name"
        className="input"
      />
      <textarea
        onChange={(e) => setPDescription(e.target.value)}
        placeholder="Description"
        className="textarea h-20 placeholder:text-primary"
      ></textarea>
      <input
        onChange={(e) => setPSkills(e.target.value)}
        type="text"
        placeholder="Skills"
        className="input"
      />
      <input type="text" placeholder="Website URL" className="input" />
      <input type="text" placeholder="GitHub Repo URL" className="input" />
      <input type="text" placeholder="Project Photo" className="input" />

      <label className="select">
        <span className="label">Project Status</span>
        <select>
          <option onClick={() => setProject_Status("Completed")}>
            Completed
          </option>
          <option onClick={() => setProject_Status("Ongoing")}>Ongoing</option>
          <option onClick={() => setProject_Status("Discarded")}>
            Discarded
          </option>
        </select>
      </label>

      <label className="select">
        <span className="label">Help Indicator</span>
        <select>
          <option onClick={() => setHelp_indicator("need_help")}>
            Need Help
          </option>
          <option onClick={() => setHelp_indicator("no_help")}>
            No Help Needed
          </option>
        </select>
      </label>

      <div className="w-1/2 flex justify-around">
        <button
          onClick={() => setAdd(false)}
          type="submit"
          className="btn btn-soft btn-error border border-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={(e) => {
            handleSubmit();
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
  );
};

export default AddProject;
