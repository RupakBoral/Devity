/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import Loading from "../utils/Loading";

const ProjectDetails = ({ projects }) => {
  return (
    <section className="flex flex-col gap-10 mx-auto w-screen">
      {projects ? (
        projects.map((project, index) => {
          return (
            <div
              key={index}
              className="card w-2/4 h-1/4 transition-all duration-00 cursor-pointer hover:shadow-lg hover:shadow-accent bg-base-200/50 gap-6 mx-auto lg:card-side shadow-sm border border-accent p-4 rounded-sm"
            >
              <figure className="w-1/2 border border-accent shadow-sm shadow-accent">
                <img className="object-cover" src={project.P_PhotoURL} alt="" />
              </figure>
              <div className="card-body w-1/2">
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold card-title text-xl text-base-content">
                    {project.PName}
                    <Link target="_blank" to={project.P_URL}>
                      <FiExternalLink className="cursor-pointer" />
                    </Link>
                  </h1>
                  <p className="font-semibold">
                    Description:{" "}
                    <span className="font-medium">{project.PDescription}</span>
                  </p>
                  <p className="font-semibold">
                    Skills Used:{" "}
                    <span className="font-medium">{project.PSkills}</span>
                  </p>
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
                <button className="btn btn-primary w-1/4 mx-auto">
                  Connect
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default ProjectDetails;
