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
    <main className="flex gap-4 overflow-x-scroll">
      {projects != null &&
        projects.length != 0 &&
        projects.map((project, index) => {
          const { PName, PDescription, PSkills, P_PhotoURL, P_URL, P_GitURL } =
            project;
          return (
            <section
              key={index}
              className="flex flex-col gap-2 border bg-base-200 border-accent min-w-[80%] md:min-w-96 py-3 px-5 rounded-lg"
            >
              <img
                src={P_PhotoURL}
                alt="project image"
                loading="lazy"
                className="md:w-fit aspect-video md:h-56 object-contain rounded-sm border border-accent mx-auto"
              />
              <h1 className="text-accent-content font-light text-sm md:text-lg">
                {PName}
              </h1>
              <p className="md:text-base text-xs">{PDescription}</p>
              {PSkills !== null && PSkills.length !== 0 ? (
                <div className="md:text-base text-xs">
                  <span className="text-blue-400">Skills: </span>
                  <span>{PSkills[0]}</span>
                </div>
              ) : (
                <span className="hidden"></span>
              )}
              {P_URL !== null && P_URL !== undefined && P_URL.length !== 0 ? (
                <div className="md:text-base text-xs">
                  <span className="text-blue-400">Website: </span>
                  <Link to={P_URL} className="">
                    {project.PName}
                  </Link>
                </div>
              ) : (
                <span className="hidden"></span>
              )}
              {P_GitURL !== null &&
              P_GitURL !== undefined &&
              P_GitURL.length !== 0 ? (
                <Link
                  target="_blank"
                  to={P_GitURL}
                  className="text-blue-400 md:text-base text-xs"
                >
                  Link to GitHub Repository
                </Link>
              ) : (
                <span className="hidden"></span>
              )}
            </section>
          );
        })}
    </main>
  ) : (
    <div>
      <p>{err}</p>
      <span></span>
    </div>
  );
};

export default ProjectCard;
