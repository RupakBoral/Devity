/* eslint-disable react/prop-types */
import leftArrow from "../img/leftArrow.jpg";

const Details = ({ user, showDetails, setShowDetails }) => {
  const { about, skills } = user;

  return (
    <div className="flex flex-col md:flex-row items-center justify-around gap-8 bg-pink-200 p-10 rounded-lg shadow-[10px_10px_0px_red] border border-gray-300 w-full max-w-4xl mx-auto relative">
      <button
        className="my-auto left-0"
        onClick={() => setShowDetails(!showDetails)}
      >
        <img src={leftArrow} className="w-10 h-10 rounded-full" />
      </button>
      <div className="flex flex-col w-full gap-4 justify-evenly text-black">
        <div className="bg-red-100 border-4 border-black p-4 rounded-lg shadow-[6px_6px_0px_black]">
          <h2 className="font-bold text-xl">About</h2>
          <p>
            {about} A passionate and dedicated [your profession], with [number]
            years of experience in [relevant field]. Driven by a desire to [your
            key motivation], I consistently deliver high-quality results through
            [mention a key skill or approach]. My expertise lies in [list 2-3
            specific areas of expertise], and I am particularly adept at
            [highlight a standout accomplishment or skill].
          </p>
        </div>
        <div className="bg-red-100 border-4 border-black p-4 rounded-lg shadow-[6px_6px_0px_black] ml-auto">
          <h1 className="font-bold text-xl">Skills</h1>
          <p>{skills}</p>
        </div>
        <div className="bg-red-100 border-4 border-black p-4 rounded-lg shadow-[6px_6px_0px_black]">
          <h1 className="font-bold text-xl">Contact Me </h1>
        </div>
      </div>
    </div>
  );
};

export default Details;
