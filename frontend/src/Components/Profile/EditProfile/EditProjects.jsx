import { useState } from "react";
import ProjectForm from "./ProjectForm";
import AddProject from "./AddProject";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";

/* eslint-disable react/prop-types */
const EditProjects = ({ projects }) => {
  const [btn, setBtn] = useState(false);
  const [add, setAdd] = useState(false);
  const [updateProject, setUpdateProject] = useState();
  const [err, setErr] = useState("");

  const handleDelete = async (_id) => {
    try {
      await axios.delete(BASE_URL + `/project/${_id}/delete`, {
        withCredentials: true,
      });
    } catch (err) {
      setErr(err);
      setTimeout(() => {
        setErr("");
      }, 2000);
    }
  };

  return add === false ? (
    btn === false ? (
      <div className="flex flex-col items-center gap-4 w-full mx-auto">
        {projects !== null && projects.length !== 0 ? (
          projects.map((project, index) => (
            <div key={index} className="card card-border bg-base-100 w-96 ">
              <div className="card-body">
                <h2 className="card-title">{project.PName}</h2>
                <p>{project.PDescription}</p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => {
                      setUpdateProject(project);
                      setBtn(true);
                    }}
                    className="btn btn-accent"
                  >
                    Edit Now
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(project._id);
                    }}
                    className="btn btn-accent"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p></p>
        )}
        <button onClick={() => setAdd(true)} className="btn btn-dash">
          ADD
        </button>
        <p>{err}</p>
      </div>
    ) : (
      <ProjectForm updateProject={updateProject} setBtn={setBtn} />
    )
  ) : (
    <AddProject setAdd={setAdd} />
  );
};

export default EditProjects;

/*



<fieldset className="fieldset">
  <legend className="fieldset-legend">Your bio</legend>
  <textarea className="textarea h-24" placeholder="Bio"></textarea>
  <div className="fieldset-label">Optional</div>
</fieldset>
*/
