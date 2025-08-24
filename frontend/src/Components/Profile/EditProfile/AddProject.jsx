/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { compressBase64 } from "../../../utils/constants";
import uploadImage from "../../../utils/uploadImage";
import { addNewProject } from "../../../utils/projectSlice";

const AddProject = ({ setAdd }) => {
  const [err, setErr] = useState();
  const [PName, setPName] = useState("");
  const [PDescription, setPDescription] = useState("");
  const [P_PhotoURL, setP_PhotoURL] = useState("");
  const [PSkills, setPSkills] = useState("");
  const [project_status, setProject_Status] = useState("Completed");
  const [photoUpload, setPhotoUpload] = useState("Upload");

  const dispatch = useDispatch();

  const handlePhotoUpload = (event) => {
    event.preventDefault();
    try {
      event.preventDefault();
      setPhotoUpload("Uploading");
      const fileInput = event.target.elements.photoURL;
      const file = fileInput.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          const compressedBase64 = await compressBase64(reader.result);
          const secure_url = await uploadImage(compressedBase64, setErr);

          setP_PhotoURL(secure_url);
          setPhotoUpload("Uploaded");
        } catch (err) {
          setErr(err);
        }
      };
    } catch (err) {
      setErr(err);
    }
  };

  const handleSubmit = async () => {
    try {
      const body = {
        PName,
        PDescription,
        PSkills,
        P_PhotoURL,
        project_status,
      };
      const res = await axios.post(BASE_URL + "/project/add", body, {
        withCredentials: true,
      });
      dispatch(addNewProject(res?.data?.data));
      setAdd(false);
    } catch (err) {
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

      <div className="flex justify-around">
        <form
          className="gap-4 min-w-full flex flex-col items-center"
          onSubmit={(event) => handlePhotoUpload(event, "projectPhoto")}
        >
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .webp"
            className="file-input file-input-bordered max-w-xs"
            name="photoURL"
            placeholder={P_PhotoURL}
          />
          <button
            type="submit"
            className="cursor-pointer btn btn-sm btn-primary"
          >
            {photoUpload + " Photo"}
          </button>
        </form>
      </div>

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

export default AddProject;
