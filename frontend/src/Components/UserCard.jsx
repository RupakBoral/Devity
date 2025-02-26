import { useState } from "react";
import rightArrow from "../img/rightArrow.jpg";
import Details from "./Details";

/* eslint-disable react/prop-types */
const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about } = user;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-col items-center min-h-3/4 justify-around bg-stone-100 rounded-lg w-full max-w-3xl mx-auto relative">
      {/* Nav bar */}
      <div className="bg-stone-400 w-full flex justify-between items-center px-3 py-2   rounded-t-md">
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
      </div>
      {!showDetails ? (
        <section className="flex w-full p-10 pr-16 gap-4 relative">
          <div className="flex flex-col w-5/6 gap-6">
            <div className="flex text-center w-full">
              <div className="">
                <h1 className="text-3xl font-bold mb-3 text-gray-900">
                  Hi! My name is {firstName} {lastName}!
                </h1>
                <p className="list-disc text-gray-700 text-lg">
                  {about} A passionate and dedicated [your profession], with
                  [number] years of experience in [relevant field]. Driven by a
                  desire to [your key motivation], I consistently deliver
                  high-quality results through [mention a key skill or
                  approach]. My expertise lies in [list 2-3 specific areas of
                  expertise], and I am particularly adept at [highlight a
                  standout accomplishment or skill].
                </p>
              </div>
            </div>
            <div className="flex justify-evenly">
              <button className="text-lg bg-stone-700 text-stone-200 hover:bg-stone-200 hover:text-black font-bold py-2 px-4 rounded-sm shadow-[5px_5px_0px_gray] hover:shadow-md transition duration-700 ease-in-out">
                Ignore ❌
              </button>
              <button className="text-lg bg-stone-200 hover:bg-stone-700 hover:text-white text-black font-bold py-2 px-4 rounded-sm shadow-[5px_5px_0px_gray] hover:shadow-md transition duration-700 ease-in-out">
                Interested ✔️
              </button>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden">
            <img
              src={photoUrl}
              alt={`${firstName}`}
              className="w-64 h-64 object-cover"
            />
          </div>

          <button
            className="right-2 top-[40%] absolute"
            onClick={() => setShowDetails(!showDetails)}
          >
            <img className="w-12 h-12 rounded-full" src={rightArrow} />
            {/*showDetails ? "Back" : "Next →"*/}
          </button>
        </section>
      ) : (
        <Details
          user={user}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />
      )}
    </div>
  );
};

export default UserCard;
