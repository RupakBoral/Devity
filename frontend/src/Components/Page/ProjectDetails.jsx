/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import Loading from "../utils/Loading";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useState } from "react";

const ProjectDetails = ({ projects }) => {
  const [requirements, setRequirements] = useState({
    description: null,
    skills: null,
    rolesRequired: null,
  });

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
      setRequirements({
        description: data?.requirements,
        skills: data?.skillsRequired,
        rolesRequired: data?.rolesRequired,
      });
    } catch (error) {
      setErr(error);
    } finally {
      setTimeout(() => {
        setErr("");
      }, 3000);
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
    } catch (error) {
      setErr(error?.response?.data);
    } finally {
      setTimeout(() => {
        setSuccess("");
        setErr("");
      }, 3000);
    }
  };

  return (
    <section className="flex flex-col gap-10 mx-auto">
      {projects ? (
        projects.map((project, index) => {
          return (
            <div
              key={index}
              className="card w-full md:w-[80%] lg:w-[80%] h-fit transition-all duration-500 cursor-pointer hover:shadow-lg hover:shadow-accent-content/30 bg-base-100/20 md:gap-6 lg:gap-6 mx-auto lg:card-side shadow-sm border border-accent p-4 rounded-sm"
            >
              <input
                type="checkbox"
                id={`my_modal_${index}`}
                className="modal-toggle"
              />
              <div className="modal" role="dialog">
                <div className="modal-box bg-accent flex flex-col gap-8">
                  <div>
                    <p>
                      What help I need:{" "}
                      <span className="text-accent-content">
                        {requirements !== null &&
                        requirements.description !== null &&
                        requirements.description !== undefined
                          ? requirements.description
                          : "No details provided"}
                      </span>
                    </p>
                    <p>
                      Role:{" "}
                      <span className="text-accent-content">
                        {requirements !== null &&
                        requirements.skills !== null &&
                        requirements.skills !== undefined
                          ? requirements.skills
                          : "No details provided"}
                      </span>
                    </p>
                    <p>
                      Skills:{" "}
                      <span className="text-accent-content">
                        {requirements !== null &&
                        requirements.rolesRequired !== null &&
                        requirements.rolesRequired !== undefined
                          ? requirements.rolesRequired
                          : "No details provided"}
                      </span>
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
                  className="object-cover"
                  src={project.P_PhotoURL}
                  alt="project photo"
                  loading="lazy"
                />
              </figure>

              <div className="card-body mx-auto w-full">
                <div className="flex flex-col md:gap-2 lg:gap-2">
                  <h1 className="font-semibold font-merriweather card-title text-md md:text-xl text-base-content">
                    {project.PName}
                    <Link target="_blank" to={project.P_URL}>
                      <FiExternalLink className="cursor-pointer" />
                    </Link>
                  </h1>
                  <p className="font-semibold text-md md:text-base">
                    Description:{" "}
                    <span className="font-light">{project.PDescription}</span>
                  </p>
                  <p className="font-semibold md:inline lg:inline hidden text-base">
                    Skills Used:{" "}
                    <span className="font-light">{project.PSkills}</span>
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
