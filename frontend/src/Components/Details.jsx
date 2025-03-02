/* eslint-disable react/prop-types */
import { FiChevronLeft } from "react-icons/fi";

const Details = ({ user, showDetails, setShowDetails }) => {
  const { about, skills } = user;

  return (
    <div className="flex flex-col min-h-3/4 md:flex-row items-center justify-around gap-4 bg-stone-100 p-10 rounded-lg w-full max-w-3xl mx-auto relative">
      <button
        className="left-2 absolute"
        onClick={() => setShowDetails(!showDetails)}
      >
        <FiChevronLeft className="w-10 h-10" />
      </button>
      <div className="flex flex-col w-full gap-4 justify-evenly text-black p-4">
        <div className="p-4 rounded-lg ">
          <h2 className="font-bold text-xl">About</h2>
          <p>{about}</p>
        </div>
      </div>
      <div className="text-black  p-4 rounded-lg w-1/2">
        <h1 className="font-bold text-xl">Skills</h1>
        <p>{skills}</p>
      </div>
    </div>
  );
};

export default Details;
