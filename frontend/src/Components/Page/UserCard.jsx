/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { updateFeed } from "../../utils/feedSlice";

const UserCard = ({ user, setToast }) => {
  const {
    _id,
    firstName,
    lastName,
    headline,
    photoUrl,
    about,
    skills,
    projects,
  } = user;
  const [showDetails, setShowDetails] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();

  const handleRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToast(status);
      dispatch(updateFeed(_id));
      setTimeout(() => {
        setToast(null);
      }, 2000);
      setErr("");
    } catch (err) {
      setErr(err);
    }
  };

  return user !== null ? (
    <div className="border-yellow-400/25 shadow-md bg-base-200 shadow-amber-200 border-2 duration-300 max-w-lg md:max-w-4xl lg:max-w-4xl mt-28 mx-2 md:mx-auto lg:mx-auto animate-LightblinkGlow transition-shadow ease-in rounded-md">
      <section className="flex w-full items-center relative min-h-[400px] md:min-h-[400px] lg:min-h-[400px]">
        <div className="flex flex-col md:flex-row lg:flex-row gap-6 p-5 md:p-10 lg:p-10 w-full mx-auto items-center">
          <img
            src={photoUrl}
            alt={`${firstName}`}
            className="w-40 h-40 md:w-64 md:h-64 lg:w-64 lg:h-64 mx-auto object-cover rounded-md border-2"
          />
          <div className="text-center md:text-justify lg:text-justify space-y-0 ">
            <h1 className="text-2xl font-merriweather">
              {firstName} {lastName && lastName}
            </h1>
            <p className="text-lg font-montserrat pt-2 pb-4 text-success">
              {headline}
            </p>
            <p className="text-wrap pb-2 text-base-content/85 text-xl font-merriweather">
              {about}
            </p>
            {skills.length !== 0 && (
              <div className="flex items-center gap-2 text-lg font-inter-sans-serif">
                <span className="text-xl font-semibold">Skills:</span>{" "}
                <p className=" text-lg ">{skills}</p>
              </div>
            )}
            <div className="card-actions flex w-3/5 pt-8 pb-4 mx-auto justify-around">
              <button
                onClick={() => handleRequest("ignored", _id)}
                className="btn btn-soft border-2 border-[#404040] text-lg font-montserrat "
              >
                Ignore
              </button>
              <button
                onClick={() => handleRequest("interested", _id)}
                className="btn btn-outline btn-success dark:hover:shadow-[0px_0px_7px_4px_#57977f] duration-500 ease-in font-montserrat text-lg"
              >
                Connect
              </button>
            </div>
          </div>
        </div>

        {projects.length !== 0 && (
          <button
            className="right-2 top-[47%] absolute"
            onClick={() => setShowDetails(!showDetails)}
          >
            <FiChevronRight className="w-10 animate-pulse h-10" />
            {/*showDetails ? "Back" : "Next →"*/}
          </button>
        )}
        <p>{err}</p>
      </section>
    </div>
  ) : (
    <div>
      <p className="text-center">No data available</p>
    </div>
  );
};

export default UserCard;
