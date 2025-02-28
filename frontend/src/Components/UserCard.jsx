/* eslint-disable react/prop-types */
import { useState } from "react";
import rightArrow from "../img/rightArrow.jpg";
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
      setTimeout(() => {
        setToast(null);
      }, 2000);
      dispatch(updateFeed(_id));
      setErr("");
    } catch (err) {
      setErr(err);
    }
  };

  return user !== null ? (
    <div className="flex flex-col items-center relative min-h-3/4 border-2 border-stone-300 dark:border-0 justify-around rounded-lg w-full max-w-3xl mx-auto">
      {/* Nav bar */}
      <div className="dark:bg-stone-700 bg-stone-400 w-full flex justify-between items-center px-3 py-2  rounded-t-md">
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
      </div>
      {!showDetails ? (
        <section className="flex w-full p-6 bg-stone-100 dark:bg-stone-400 rounded-b-lg">
          <div className="flex flex-col space-y-4 w-full  mx-auto items-center">
            <img
              src={photoUrl}
              alt={`${firstName}`}
              className="w-40 h-40 object-cover rounded-full"
            />
            <h1 className="text-3xl font-bold mb-3 text-gray-900">
              Hi! My name is {firstName} {lastName}!
            </h1>
            <p className="text-center text-gray-700 text-lg">
              {about} A passionate and dedicated [your profession], with
              [number] years of experience in [relevant field]. Driven by a
              desire to [your key motivation], I consistently deliver
              high-quality results through [mention a key skill or approach]. My
              expertise lies in [list 2-3 specific areas of expertise], and I am
              particularly adept at [highlight a standout accomplishment or
              skill].
            </p>
            <div className="flex w-3/5 mx-auto justify-around">
              <button
                onClick={() => handleRequest("ignored", _id)}
                className="btn btn-error"
              >
                Ignore
              </button>
              <button
                onClick={() => handleRequest("interested", _id)}
                className="btn btn-info"
              >
                Connect
              </button>
            </div>
          </div>

          <button
            className="right-2 top-[40%] absolute"
            onClick={() => setShowDetails(!showDetails)}
          >
            <img className="w-12 h-12 rounded-full" src={rightArrow} />
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
