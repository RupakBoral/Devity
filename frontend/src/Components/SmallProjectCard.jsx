/* eslint-disable react/prop-types */
import ProfileBg from "../img/ProfileBg.jpg";

const SmallProjectCard = ({ projects }) => {
  return (
    <div className="">
      {projects.map((project, index) => (
        <section
          key={index}
          className="flex flex-col gap-2 border-2 w-72 bg-stone-200 p-4 rounded-lg"
        >
          <p className="text-black font-bold">{project.PName}</p>
          <img src={ProfileBg} className="w-64 h-56 rounded-lg mx-auto" />
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
  );
};

export default SmallProjectCard;
