import { useState } from "react";
import rightArrow from "../img/rightArrow.jpg";
import Details from "./Details";

/* eslint-disable react/prop-types */
const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about } = user;
  const [showDetails, setShowDetails] = useState(false);

  return !showDetails ? (
    <div className="flex flex-col items-center h-3/4 justify-around shadow-[10px_10px_0px_red] bg-pink-200 py-10 px-4 rounded-lg w-full max-w-4xl mx-auto relative">
      <div className="flex gap-2">
        <div className="flex-1 text-left">
          <h1 className="text-3xl font-bold mb-3 text-black">
            Hi! My name is {firstName} {lastName}!
          </h1>
          <ul className="list-disc pl-5 text-black text-lg">{about}</ul>

          <div className="flex gap-4 mt-4">
            <div className="w-12 scale-150 h-12 flex items-center justify-center">
              📁
            </div>
            <div className="w-12 h-12 flex items-center justify-center scale-150">
              📁
            </div>
          </div>
        </div>

        {/* Right Side - Image in a Window */}
        <div className="flex-1 flex justify-center items-center ">
          <div className="shadow-[10px_10px_0px_red] border-2 border-black rounded-lg overflow-hidden">
            {/* Window Header */}
            <div className="bg-gray-200 flex justify-between items-center px-3 py-2 border-b-2 border-black">
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
            </div>
            {/* Image */}
            <img
              src={photoUrl}
              alt={`${firstName}`}
              className="w-64 h-64 object-cover"
            />
          </div>
        </div>
        {/* Next Button */}
        <button
          className="my-auto"
          onClick={() => setShowDetails(!showDetails)}
        >
          <img className="w-10 h-10 rounded-full" src={rightArrow} />
          {/*showDetails ? "Back" : "Next →"*/}
        </button>
      </div>
      <div className="flex justify-between w-1/2">
        <button className="text-lg bg-white border border-pink-300 text-pink-700 font-bold py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out">
          Ignore ❌
        </button>
        <button className="text-lg bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
          Interested ✔️
        </button>
      </div>
    </div>
  ) : (
    <Details
      user={user}
      showDetails={showDetails}
      setShowDetails={setShowDetails}
    />
  );
};

export default UserCard;
