/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { addProject } from "../../utils/projectSlice";
import { Link } from "react-router-dom";

const SmallProjectCard = () => {
  const user = useSelector((store) => store.user);
  const [projects, setProjects] = useState([]);
  const [err, setErr] = useState();
  const dispatch = useDispatch();

  const fetchProjects = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/projects", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProjects(res?.data?.data?.projects);
      dispatch(addProject(res?.data?.data?.projects));
    } catch (err) {
      setErr(err);
    }
  };

  useEffect(() => {
    if (projects !== null && projects.length !== 0) return;
    fetchProjects();
  }, [projects]);

  return user !== null ? (
    <div className="grid grid-cols-2 gap-4">
      {projects &&
        projects.map((project, index) => (
          <section
            key={index}
            className="flex flex-col gap-2 border border-accent-content w-96 py-3 px-5 rounded-lg"
          >
            <p className="font-semibold font-montserrat text-lg">
              {project.PName}
            </p>
            <img
              src={project.BgUrl}
              className="w-full p-4 h-56 rounded-lg mx-auto"
            />
            <p className="text-accent-content text-justify">
              {project.PDescription}
            </p>
            {project.PSkills !== null && project.PSkills.length !== 0 ? (
              <p>
                Skills:{" "}
                <span className="font-semibold text-accent-content">
                  {project.PSkills[0]}
                </span>
              </p>
            ) : (
              <p></p>
            )}
            {project.P_URL !== null && project.P_URL !== undefined ? (
              <p>
                Website:{" "}
                <Link
                  to={project.P_URL}
                  className="text-accent-content font-semibold"
                >
                  {project.PName}
                </Link>
              </p>
            ) : (
              <p></p>
            )}
            {project.P_GitURL !== null && project.P_GitURL !== undefined ? (
              <Link
                to={project.P_GitURL}
                className="text-accent-content font-semibold"
              >
                GitHub Repository
              </Link>
            ) : (
              <p></p>
            )}
            {project.P_GitURL !== null && project.P_GitURL !== undefined ? (
              <Link
                to={project.P_PhotoURL}
                className="text-accent-content font-semibold"
              >
                PhotoURL
              </Link>
            ) : (
              <p></p>
            )}
            <p></p>
          </section>
        ))}
    </div>
  ) : (
    <div>
      <p className="text-center">{err}</p>
    </div>
  );
};

export default SmallProjectCard;
