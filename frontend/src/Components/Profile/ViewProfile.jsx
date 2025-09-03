/* eslint-disable react/prop-types */
import { lazy } from "react";
const ProjectCard = lazy(() => import("./ProjectCard"));
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ViewProfile = ({ user }) => {
  const navigate = useNavigate();
  if (user === null || user == undefined) return;

  const {
    firstName,
    lastName,
    about,
    headline,
    BgUrl,
    photoUrl,
    skills,
    projects,
  } = user;

  return (
    <main className="md:w-4xl w-screen h-full min-h-screen rounded-lg flex flex-col gap-4">
      <FiChevronLeft
        onClick={() => {
          navigate(-1);
        }}
        aria-label="back"
        className="md:w-8 md:h-8 w-6 h-6 cursor-pointer"
      />
      <section className="rounded-lg bg-base-200/50 border border-gray-400">
        <div className="relative rounded-lg">
          <img
            alt="Bg image"
            fetchPriority="high"
            className="h-56 rounded-t-lg aspect-video w-full object-cover"
            src={
              BgUrl ||
              "https://t3.ftcdn.net/jpg/09/12/76/70/360_F_912767030_3E4ePOMr42kY42YcFIQhrzUEH9iAFwuW.jpg"
            }
          />
          <img
            alt="user's profile photo"
            loading="lazy"
            className="aspect-square w-32 h-32 border-2 border-base-content object-cover rounded-full absolute -bottom-10 left-10"
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

          <h2 className="text-lg text-gray-500">{headline}</h2>
        </div>
      </section>

      <section className="p-6 rounded-lg border flex flex-col bg-base-200/50 border-gray-400 gap-2 justify-between">
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
          <h2 className=" font-merriweather md:text-lg text-md font-semibold">
            Skills
          </h2>
          <hr className="text-accent" />
          <div className="flex flex-wrap gap-2">
            {skills &&
              skills.map((skill) => (
                <span
                  key={skill}
                  className="text-base-content/65 md:text-md text-sm"
                >
                  {skill}
                </span>
              ))}
          </div>
        </section>
      )}

      {projects !== null && projects !== undefined && projects.length !== 0 ? (
        <section className="p-6 rounded-lg bg-base-200/50 dark:border border-gray-400 ">
          <div className="flex flex-1 flex-col gap-2 justify-between">
            <h2 className="lg:text-xl md:text-lg text-md font-merriweather font-semibold">
              Projects
            </h2>
            <hr className="text-accent" />
            <ProjectCard secondaryUser={user} />
          </div>
        </section>
      ) : (
        <p className="hidden"></p>
      )}
    </main>
  );
};

export default ViewProfile;
