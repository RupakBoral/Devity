/* eslint-disable react/prop-types */
import { lazy } from "react";
const ProjectCard = lazy(() => import("./ProjectCard"));

const ViewProfile = ({ user }) => {
  if (user === null || user == undefined) return;

  const {
    firstName,
    lastName,
    about,
    // gitHub,
    headline,
    BgUrl,
    photoUrl,
    skills,
    projects,
  } = user;

  return (
    <div className="md:w-4xl lg:w-4xl h-full min-h-screen rounded-lg flex flex-col gap-4">
      <section className="rounded-lg bg-base-200/50 border border-gray-400">
        <div className="relative rounded-lg">
          <img
            className="h-56 rounded-t-lg w-full object-cover"
            src={
              BgUrl ||
              "https://t3.ftcdn.net/jpg/09/12/76/70/360_F_912767030_3E4ePOMr42kY42YcFIQhrzUEH9iAFwuW.jpg"
            }
          />
          <img
            className="w-32 h-32 border-2 border-base-content object-cover rounded-full absolute -bottom-10 left-10"
            src={
              photoUrl ||
              "https://img.freepik.com/premium-vector/professional-male-avatar-profile-picture-employee-work_1322206-66590.jpg"
            }
          />
        </div>
        <div className="mt-12 p-6">
          <h1 className="font-semibold font-montserrat text-2xl">
            {firstName} {lastName}
          </h1>

          <h3 className="text-lg text-gray-500">{headline}</h3>
        </div>
      </section>

      <section className="p-6 rounded-lg border flex flex-col bg-base-200/50 border-gray-400 gap-2 justify-between ">
        <h2 className="font-merriweather lg:text-xl md:text-lg text-md font-semibold">
          General Information
        </h2>
        <hr className="text-accent" />
        <p className="lg:text-lg md:text-md text-sm text-base-content/65">
          {about}
        </p>
      </section>

      {skills !== null && skills !== undefined && skills.length !== 0 && (
        <section className="flex flex-col p-6 bg-base-200/50  rounded-lg gap-2 border border-gray-400">
          <h1 className=" font-merriweather lg:text-xl md:text-lg text-md font-semibold">
            Skills
          </h1>
          <hr className="text-accent" />
          <div className="flex flex-wrap gap-2">
            {skills &&
              skills.map((skill) => (
                <span
                  key={skill}
                  className="text-base-content/65 lg:text-lg md:text-md text-sm"
                >
                  {skill}
                </span>
              ))}
          </div>
        </section>
      )}

      {projects !== null && projects !== undefined && projects.length !== 0 ? (
        <section className="p-6 rounded-lg bg-base-200/50 dark:border border-gray-400">
          <div className="flex flex-1 flex-col gap-2 justify-between">
            <h2 className="lg:text-xl md:text-lg text-md font-merriweather font-semibold">
              Projects
            </h2>
            <hr className="text-accent" />
            <ProjectCard secondaryUser={user} />
          </div>
        </section>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ViewProfile;
