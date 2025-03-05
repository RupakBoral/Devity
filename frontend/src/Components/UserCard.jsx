/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import Details from "./Details";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { updateFeed } from "../utils/feedSlice";

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
    <div className="h-full max-w-4xl mx-auto">
      {!showDetails ? (
        <section className="flex w-full animate-blinkGlow transition-shadow ease-in relative min-h-[450px] bg-stone-100 dark:bg-stone-950 ">
          <div className="flex gap-6 p-10 w-full mx-auto items-center">
            <img
              src={photoUrl}
              alt={`${firstName}`}
              className="w-72 h-72 object-cover rounded-md dark:border-white border-4"
            />
            <div className="text-justify space-y-0">
              <h1 className="text-4xl font-merriweather text-gray-900 dark:text-[#dada73]">
                {firstName.toUpperCase()} {lastName && lastName.toUpperCase()}
              </h1>
              <p className="text-lg font-montserrat pb-6 dark:text-white">
                {headline}
              </p>
              <p className="text-gray-700 text-wrap pb-2 dark:text-[#a2cfef] text-xl font-merriweather">
                {about}
              </p>
              {skills.length !== 0 && (
                <div className="flex items-center gap-2 text-lg font-inter-sans-serif">
                  <span className="text-xl dark:text-[#84c2ab] font-semibold">
                    Skills:
                  </span>{" "}
                  <p className=" text-lg dark:text-white">{skills}</p>
                </div>
              )}
              <div className="flex w-3/5 pt-8 pb-4 mx-auto justify-around">
                <button
                  onClick={() => handleRequest("ignored", _id)}
                  className="btn bg-[#404040] text-lg font-montserrat dark:text-white"
                >
                  Ignore
                </button>
                <button
                  onClick={() => handleRequest("interested", _id)}
                  className="btn dark:hover:shadow-[0px_0px_10px_5px_#57977f] duration-700 ease-in dark:border-white font-montserrat text-lg dark:text-black dark:bg-[#57977f]"
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
              <FiChevronRight className="w-10 animate-pulse h-10 text-gray-400" />
              {/*showDetails ? "Back" : "Next →"*/}
            </button>
          )}
          <p>{err}</p>
        </section>
      ) : (
        <Details
          user={user}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />
      )}
    </div>
  ) : (
    <div>
      <p className="text-center">No data available</p>
    </div>
  );
};

export default UserCard;
