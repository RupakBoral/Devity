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
              className="card w-5/6 md:w-1/2 lg:w-1/2 h-fit transition-all duration-500 cursor-pointer hover:shadow-lg hover:shadow-accent-content/30 bg-base-200 md:gap-6 lg:gap-6 mx-auto lg:card-side shadow-sm border border-accent p-4 rounded-sm"
            >
              <input type="checkbox" id="my_modal_7" className="modal-toggle" />
              <div className="modal" role="dialog">
                <div className="modal-box bg-accent flex flex-col gap-8">
                  <div>
                    <h2>Requirements: </h2>
                    <p>
                      Role: <span></span>
                    </p>
                    <p>
                      Skills: <span></span>
                    </p>
                  </div>
                  <div className="w-full mx-auto">
                    <button className="btn btn-ghost mx-auto border-accent-content">
                      Request to Join Community
                    </button>
                  </div>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">
                  Close
                </label>
              </div>

              <figure className="w-full mx-auto border border-accent shadow-sm shadow-accent">
                <img
                  className="object-contain "
                  src={project.P_PhotoURL}
                  alt=""
                />
              </figure>

              <div className="card-body mx-auto w-full">
                <div className="flex flex-col md:gap-2 lg:gap-2">
                  <h1 className="font-semibold card-title text-md md:text-xl text-base-content">
                    {project.PName}
                    <Link target="_blank" to={project.P_URL}>
                      <FiExternalLink className="cursor-pointer" />
                    </Link>
                  </h1>
                  <p className="font-semibold text-md md:text-base">
                    Description:{" "}
                    <span className="font-light md:font-medium">
                      {project.PDescription}
                    </span>
                  </p>
                  <p className="font-semibold md:inline lg:inline hidden text-base">
                    Skills Used:{" "}
                    <span className="font-medium">{project.PSkills}</span>
                  </p>
                </div>
                <div className="card-actions justify-end">
                  <label htmlFor="my_modal_7" className="btn btn-accent">
                    Read more
                  </label>
                </div>
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
