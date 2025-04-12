import { useState } from "react";
import ProjectForm from "./ProjectForm";
import AddProject from "./AddProject";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../../utils/projectSlice";

/* eslint-disable react/prop-types */
const EditProjects = () => {
  const [btn, setBtn] = useState(false);
  const [add, setAdd] = useState(false);
  const [updateThisProject, setUpdateThisProject] = useState();
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const projects = useSelector((store) => store.projects);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(BASE_URL + `/project/${_id}/delete`, {
        withCredentials: true,
      });
      dispatch(deleteProject(_id));
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
            <div
              key={index}
              className="card card-sm md:card-md lg:card-lg card-border bg-base-100 w-[90%]"
            >
              <div className="card-body">
                <h2 className="card-title">{project.PName}</h2>
                <p>{project.PDescription}</p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => {
                      setUpdateThisProject(project);
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
      <ProjectForm updateThisProject={updateThisProject} setBtn={setBtn} />
    )
  ) : (
    <AddProject setAdd={setAdd} />
  );
};

export default EditProjects;
