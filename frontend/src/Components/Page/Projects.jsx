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
    <section className="flex flex-col py-8 gap-8 bg-gradient-to-b to-base-300 from-base-accent pt-24">
      <h1 className="text-3xl text-center font-semibold">Projects</h1>
      <ProjectDetails projects={projects} />
      <p>{err}</p>
    </section>
  ) : (
    <Loading />
  );
};

export default Projects;
