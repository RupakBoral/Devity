/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { addProject } from "../../utils/projectSlice";
import { Link } from "react-router-dom";

const ProjectCard = ({ secondaryUser }) => {
  const user = useSelector((store) => store.user);
  const Storedprojects = useSelector((store) => store.projects);
  const [projects, setProjects] = useState(Storedprojects);
  const [err, setErr] = useState();
  const dispatch = useDispatch();

  const fetchProjects = async () => {
    try {
      const _id = secondaryUser._id;
      if (
        Storedprojects !== null &&
        Storedprojects.length !== 0 &&
        user._id === _id
      )
        return;
      const res = await axios.get(BASE_URL + `/user/projects/${_id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProjects(res?.data?.data?.projects);
      if (user._id === _id) dispatch(addProject(res?.data?.data?.projects));
    } catch (err) {
      setErr(err);
    }
  };

  useEffect(() => {
    if (
      projects !== null &&
      projects.length !== 0 &&
      user._id === secondaryUser._id
    )
      return;
    fetchProjects();
  }, []);

  return secondaryUser !== null ? (
    <div className="flex overflow-x-scroll gap-4">
      {projects != null &&
        projects.length != 0 &&
        projects.map((project, index) => (
          <section
            key={index}
            className="flex flex-col gap-2 border bg-base-200 border-accent w-60 md:min-w-96 py-3 px-5 rounded-lg"
          >
            <img
              src={project.P_PhotoURL}
              alt="project image"
              loading="lazy"
              className="w-full h-fit aspect-video md:h-56 lg:h-56 rounded-sm border border-accent mx-auto object-contain md:object-cover lg:object-cover"
            />
            <h1 className="font-semibold font-montserrat text-lg">
              {project.PName}
            </h1>
            <p className="text-accent-content text-justify hidden md:inline-block lg:inline-block">
              {project.PDescription}
            </p>
            {project.PSkills !== null && project.PSkills.length !== 0 ? (
              <p className=" hidden md:inline-block lg:inline-block">
                Skills:{" "}
                <span className="font-semibold text-accent-content">
                  {project.PSkills[0]}
                </span>
              </p>
            ) : (
              <span></span>
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
              <span></span>
            )}
            {project.P_GitURL !== null && project.P_GitURL !== undefined ? (
              <Link
                to={project.P_GitURL}
                className="text-accent-content font-semibold"
              >
                GitHub Repository
              </Link>
            ) : (
              <span></span>
            )}
            {project.P_GitURL !== null && project.P_GitURL !== undefined ? (
              <Link
                to={project.P_PhotoURL}
                className="text-accent-content font-semibold"
              >
                PhotoURL
              </Link>
            ) : (
              <span></span>
            )}
            <span></span>
          </section>
        ))}
    </div>
  ) : (
    <div>
      <p>{err}</p>
      <span></span>
    </div>
  );
};

export default ProjectCard;
