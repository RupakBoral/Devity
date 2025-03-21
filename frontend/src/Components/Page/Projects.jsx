import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import ProjectDetails from "./ProjectDetails";
import axios from "axios";

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
  return (
    <section className="flex flex-col py-8 gap-10 bg-base-200/80">
      <h1 className="text-3xl text-center">Projects</h1>
      <ProjectDetails projects={projects} />
      <p>{err}</p>
    </section>
  );
};

export default Projects;
