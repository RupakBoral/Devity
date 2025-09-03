import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import ProjectDetails from "./ProjectDetails";
import axios from "axios";
import Loading from "../utils/Loading";

const Projects = () => {
  const [projects, setProjects] = useState();
  const [err, setErr] = useState();

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/projects`, {
        withCredentials: true,
      });
      setProjects(response?.data?.data);
    } catch (err) {
      setErr(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return projects ? (
    <section className="flex flex-col py-8 gap-8 bg-gradient-to-t to-base-300 from-base-accent pt-24">
      <div className="w-[90%] md:w-[70%] rounded-sm lg:w-[70%] mx-auto border border-accent-content/30 min-h-screen max-h-fit px-2 pb-10 md:px-8">
        <h1 className="text-3xl py-6 text-center font-merriweather font-light">
          Projects
        </h1>
        <ProjectDetails projects={projects} />
        <p>{err}</p>
      </div>
    </section>
  ) : (
    <Loading />
  );
};

export default Projects;
