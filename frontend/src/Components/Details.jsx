/* eslint-disable react/prop-types */
import { FiChevronLeft } from "react-icons/fi";
import SmallProjectCard from "./SmallProjectCard";

const Details = ({ user, showDetails, setShowDetails }) => {
  const { projects } = user;

  return (
    <div className="flex flex-col h-[450px] animate-blinkGlow dark:bg-black md:flex-row items-center justify-around gap-4 bg-stone-100 p-10 rounded-lg w-full max-w-3xl mx-auto relative">
      <button
        className="left-2 absolute animate-pulse"
        onClick={() => setShowDetails(!showDetails)}
      >
        <FiChevronLeft className="w-10 h-10" />
      </button>
      <div className="flex w-full gap-4 justify-evenly dark:text-white p-4">
        <SmallProjectCard projects={projects} />
      </div>
    </div>
  );
};

export default Details;
