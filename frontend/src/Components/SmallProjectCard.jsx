/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";

const SmallProjectCard = ({ projects }) => {
  const user = useSelector((store) => store.user);

  return user !== null ? (
    <div>
      {projects.map((project, index) => (
        <section
          key={index}
          className="flex flex-col gap-2 border-2 w-72 bg-stone-200 p-4 rounded-lg"
        >
          <p className="text-black font-bold">{project.PName}</p>
          <img src={project.BgUrl} className="w-64 h-56 rounded-lg mx-auto" />
          <p className="text-gray-600">{project.PDescription}</p>
          <div className="flex flex-wrap gap-x-2">
            <p className="text-black font-semibold">Skills: </p>
            {project.PSkills.map((skill, index) => (
              <p className="text-gray-600 " key={index}>
                {skill} |{" "}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  ) : (
    <div>
      <p className="text-center">No data available</p>
    </div>
  );
};

export default SmallProjectCard;
