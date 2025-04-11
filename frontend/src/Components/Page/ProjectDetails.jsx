/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import Loading from "../utils/Loading";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useState } from "react";

const ProjectDetails = ({ projects }) => {
  const [requirements, setRequirements] = useState("developer");
  const [skills, setSkills] = useState("default");
  const [roles, setRoles] = useState("default");

  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const [applyRole, setApplyRole] = useState("");
  const [mssg, setMssg] = useState("");

  const handleReadMore = async (communityId) => {
    try {
      const res = await axios.get(`${BASE_URL}/community/${communityId}`, {
        withCredentials: true,
      });
      const data = res?.data?.data;
      setRequirements(data?.requirements);
      setSkills(data?.skillsRequired);
      setRoles(data?.rolesRequired);
    } catch (error) {
      setErr(error);
    }
  };

  const handleSendRequest = async (communityId) => {
    try {
      if (!applyRole || !mssg) return setErr("Please fill all the fields");
      else setErr("");
      const res = await axios.post(
        `${BASE_URL}/community/request/${communityId}`,
        {
          role: applyRole,
          message: mssg,
        },
        { withCredentials: true }
      );
      setSuccess(res?.data?.message);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      setErr(error?.response?.data);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
  };

  return (
    <section className="flex flex-col gap-10 mx-auto w-screen">
      {projects ? (
        projects.map((project, index) => {
          return (
            <div
              key={index}
              className="card w-5/6 md:w-1/2 lg:w-1/2 h-fit transition-all duration-500 cursor-pointer hover:shadow-lg hover:shadow-accent-content/30 bg-base-200 md:gap-6 lg:gap-6 mx-auto lg:card-side shadow-sm border border-accent p-4 rounded-sm"
            >
              <input
                type="checkbox"
                id={`my_modal_${index}`}
                className="modal-toggle"
              />
              <div className="modal" role="dialog">
                <div className="modal-box bg-accent flex flex-col gap-8">
                  <div>
                    <h2>Requirements:{requirements} </h2>
                    <p>
                      Role: <span>{roles}</span>
                    </p>
                    <p>
                      Skills: <span>{skills}</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <input
                      onChange={(e) => setApplyRole(e.target.value)}
                      required
                      type="text"
                      placeholder="Role you want to apply for.."
                      className="input input-neutral"
                    />

                    <input
                      onChange={(e) => setMssg(e.target.value)}
                      required
                      type="text"
                      placeholder="Your message to the admin.."
                      className="input input-neutral"
                    />
                  </div>
                  <p className="text-red-700 font-bold">{err}</p>
                  <button
                    onClick={() => handleSendRequest(project.communityId)}
                    className="btn btn-ghost border-accent-content"
                  >
                    Request to Join Community
                  </button>
                  <p className="text-green-600 font-bold">{success}</p>
                </div>
                <label className="modal-backdrop" htmlFor={`my_modal_${index}`}>
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
                  <label
                    htmlFor={`my_modal_${index}`}
                    onClick={() => handleReadMore(project.communityId)}
                    className="btn btn-accent"
                  >
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
