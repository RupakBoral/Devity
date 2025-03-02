/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import Details from "./Details";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { updateFeed } from "../utils/feedSlice";

const UserCard = ({ user, setToast }) => {
  const { _id, firstName, lastName, photoUrl, about } = user;
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
    <div className="flex flex-col items-center animate-blinkGlow transition-shadow ease-in-out shadow-[0px_0px_30px_5px_#FFFFE0] relative min-h-3/4 border-2 border-stone-300 dark:border-0 justify-around w-full max-w-3xl rounded-2xl mx-auto">
      {/* Nav bar */}
      <div className="dark:bg-stone-900 bg-stone-400 w-full flex justify-between items-center px-3 py-2  rounded-t-2xl">
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
      </div>
      {!showDetails ? (
        <section className="flex w-full p-6 bg-stone-100 dark:bg-stone-950  rounded-b-2xl">
          <div className="flex flex-col space-y-4 w-full mx-auto items-center">
            <img
              src={photoUrl}
              alt={`${firstName}`}
              className="w-40 h-40 object-cover rounded-full dark:border-white border-4"
            />
            <h1 className="text-4xl text-center font-bold font-merriweather text-gray-900 dark:text-yellow-500">
              {firstName} {lastName}
            </h1>
            <p className="text-justify text-gray-700 dark:text-gray-400 text-lg">
              {about}
            </p>
            <div className="flex w-3/5 pt-8 pb-4 mx-auto justify-around">
              <button
                onClick={() => handleRequest("ignored", _id)}
                className="btn bg-stone-700 text-lg font-montserrat"
              >
                Ignore
              </button>
              <button
                onClick={() => handleRequest("interested", _id)}
                className="btn dark:hover:bg-amber-500 font-montserrat text-lg dark:text-black dark:bg-amber-600"
              >
                Connect
              </button>
            </div>
          </div>

          <button
            className="right-2 top-[47%] absolute"
            onClick={() => setShowDetails(!showDetails)}
          >
            <FiChevronRight className="w-10 animate-pulse h-10 text-gray-400" />
            {/*showDetails ? "Back" : "Next →"*/}
          </button>
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
