/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";

const SmallProjectCard = ({ projects }) => {
  const user = useSelector((store) => store.user);

  return user !== null ? (
    <div>
      {projects &&
        projects.map((project, index) => (
          <section
            key={index}
            className="flex flex-col gap-2 border w-72 bg-stone-200 dark:bg-black p-4 rounded-lg"
          >
            <p className="text-black font-bold font-montserrat text-lg dark:text-white">
              {project.PName}
            </p>
            <img src={project.BgUrl} className="w-64 h-56 rounded-lg mx-auto" />
            <p className="text-gray-600 dark:text-gray-200">
              {project.PDescription}
            </p>
            <div className="flex flex-wrap gap-x-2 dark:text-gray-200">
              <p className="text-black dark:text-gray-200 font-semibold">
                Skills:{" "}
              </p>
              {project.PSkills.map((skill, index) => (
                <p className="text-gray-600 dark:text-gray-300" key={index}>
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
