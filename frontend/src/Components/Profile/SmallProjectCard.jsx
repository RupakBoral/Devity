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
            className="flex flex-col gap-2 border border-accent-content w-80 py-3 px-5 rounded-lg"
          >
            <p className="font-semibold font-montserrat text-lg">
              {project.PName}
            </p>
            <img src={project.BgUrl} className="w-72 h-56 rounded-lg mx-auto" />
            <p className="text-accent-content text-justify">
              {project.PDescription}
            </p>
            <div className="flex flex-wrap gap-x-2 dark:text-gray-200">
              <p className="text-base-content font-semibold">Skills: </p>
              {project.PSkills.map((skill, index) => (
                <p className="text-gray-500 " key={index}>
                  {skill} |{" "}
                </p>
              ))}
            </div>
            <p>{project.P_URL}</p>
            <p>{project.P_GitURL}</p>
            <p>{project.P_PhotoURL}</p>
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
