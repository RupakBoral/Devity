/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { addProject } from "../../utils/projectSlice";

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
    <div className="flex justify-around">
      {projects &&
        projects.map((project, index) => (
          <section
            key={index}
            className="flex flex-col gap-2 border border-accent-content w-80 py-3 px-5 rounded-lg"
          >
            <p className="font-semibold font-montserrat text-lg">
              {project.PName}
            </p>
            <img src={project.BgUrl} className="w-72 h-56 rounded-lg mx-auto" />
            <p className="text-accent-content text-justify">
              {project.PDescription}
            </p>
            <div className="flex flex-wrap gap-x-2 dark:text-gray-200">
              <p className="text-base-content font-semibold">Skills: </p>
              {project.PSkills.map((skill, index) => (
                <p className="text-gray-500 " key={index}>
                  {skill} |{" "}
                </p>
              ))}
            </div>
            <p>{project.P_URL}</p>
            <p>{project.P_GitURL}</p>
            <p>{project.P_PhotoURL}</p>
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
