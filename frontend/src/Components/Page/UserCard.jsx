/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { updateFeed } from "../../utils/feedSlice";

const UserCard = ({ user, setToast }) => {
  const { _id, firstName, lastName, headline, photoUrl, about, skills } = user;
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
    <div className="bg-base-200/50 cursor-pointer rounded-sm hover:shadow-accent-content shadow-lg backdrop-blur-sm hover:shadow-[5px_5px_2px_2px_gray] transition-shadow duration-500 border border-accent-content/50 shadow-base-content w-5/6 md:w-2/3 lg:w-1/2 mx-auto animate-fadeIn">
      <section className="flex w-full items-center relative min-h-[400px]">
        <div className="flex flex-col md:flex-row gap-6 p-6 w-full mx-auto items-center">
          {/* Profile Image with Hover Effect */}
          <img
            src={photoUrl}
            alt={`${firstName}`}
            className="w-40 h-40 md:w-64 md:h-64 object-cover rounded-lg border-2 border-neutral transition-transform duration-300"
          />

          {/* User Details */}
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-3xl font-merriweather animate-fadeInUp">
              {firstName} {lastName}
            </h1>
            <p className="text-lg font-montserrat text-success animate-fadeInUp">
              {headline}
            </p>
            <p className="text-base-content/80 text-xl font-merriweather animate-fadeInUp">
              {about}
            </p>

            {/* Skills */}
            {skills.length !== 0 && (
              <div className="flex items-center gap-2 text-lg font-inter animate-fadeInUp">
                <span className="font-semibold">Skills:</span>
                <p className="text-lg">{skills}</p>
              </div>
            )}

            {/* Action Buttons with Animation */}
            <div className="card-actions flex w-full pt-6 justify-evenly">
              <button
                onClick={() => handleRequest("ignored", _id)}
                className="btn btn-outline border border-neutral text-lg font-montserrat transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                Ignore
              </button>
              <button
                onClick={() => handleRequest("interested", _id)}
                className="btn btn-success shadow-md dark:hover:shadow-[0px_0px_10px_4px_#57977f] transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Connect
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <p className="text-error">{err}</p>
      </section>
    </div>
  ) : (
    <div>
      <p className="text-center">No data available</p>
    </div>
  );
};

export default UserCard;
