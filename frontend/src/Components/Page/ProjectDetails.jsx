/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ProjectDetails = ({ projects }) => {
  return (
    <section className="flex flex-col gap-10 mx-auto w-screen">
      {projects &&
        projects.map((project, index) => {
          return (
            <div
              key={index}
              className="w-1/2 bg-base-100/50 flex flex-col gap-6 mx-auto border border-accent p-4 rounded-sm"
            >
              <div className="flex flex-col gap-2">
                <Link
                  to={project.P_URL}
                  className="font-semibold text-xl text-base-content"
                >
                  {project.PName}
                </Link>
                <p className="font-semibold">
                  Description:{" "}
                  <span className="font-medium">{project.PDescription}</span>
                </p>
                <p className="font-semibold">
                  Skills Used:{" "}
                  <span className="font-medium">{project.PSkills}</span>
                </p>
                <img
                  className="w-1/2 h-1/2 mx-auto"
                  src={project.P_PhotoURL}
                  alt="Project_Image"
                />
                <div>
                  <h2>Requirements: </h2>
                  <p>
                    Role: <span></span>
                  </p>
                  <p>
                    Skills: <span></span>
                  </p>
                </div>
              </div>
              <button className="btn btn-primary w-1/4 mx-auto">Connect</button>
            </div>
          );
        })}
    </section>
  );
};

export default ProjectDetails;
