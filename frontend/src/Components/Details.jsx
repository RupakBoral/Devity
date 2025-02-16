/* eslint-disable react/prop-types */
import leftArrow from "../img/leftArrow.jpg";

const Details = ({ user, showDetails, setShowDetails }) => {
  const { about, skills } = user;

  return (
    <div className="flex flex-col min-h-3/4 md:flex-row items-center justify-around gap-4 bg-[#ff99ac] p-10 rounded-lg shadow-[10px_10px_0px_#fa4c50] border border-gray-300 w-full max-w-4xl mx-auto relative">
      <button
        className="left-2 absolute"
        onClick={() => setShowDetails(!showDetails)}
      >
        <img src={leftArrow} className="w-10 h-10 rounded-full" />
      </button>
      <div className="flex flex-col w-full gap-4 justify-evenly text-black p-4">
        <div className="bg-red-100 border-4 border-black p-4 rounded-lg shadow-[6px_6px_0px_black]">
          <h2 className="font-bold text-xl">About</h2>
          <p>{about}</p>
        </div>
      </div>
      <div className="bg-red-100 border-4 text-black border-black p-4 rounded-lg shadow-[6px_6px_0px_black] w-1/2">
        <h1 className="font-bold text-xl">Skills</h1>
        <p>{skills}</p>
      </div>
    </div>
  );
};

export default Details;
