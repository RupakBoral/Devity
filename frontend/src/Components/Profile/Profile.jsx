import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { FiEdit, FiUsers, FiMessageSquare, FiUserPlus } from "react-icons/fi";
import EditProfileForm from "./EditProfileForm";
import { editSetting } from "../../utils/editSlice";
import { Link } from "react-router-dom";
import GitHub from "./GitHub";

const Profile = () => {
  let user = useSelector((store) => store.user);
  const [showToast, setShowToast] = useState(false);
  const edit = useSelector((store) => store.edit);

  const dispatch = useDispatch();

  if (user === null) {
    return (
      <div className="flex justify-center mx-auto w-1/3 flex-col gap-4 h-screen">
        <div className="flex items-center gap-4 w-1/2">
          <div className="skeleton h-32 w-32 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-12 w-52"></div>
            <div className="skeleton h-12 w-52"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }

  const {
    firstName,
    lastName,
    about,
    phoneNo,
    emailId,
    age,
    gitHub,
    headline,
    BgUrl,
    photoUrl,
    skills,
    projects,
  } = user;

  return user !== null ? (
    !edit ? (
      <div className="w-screen h-full pt-28 bg-base-300 flex md:flex-row lg:flex-row flex-col justify-around lg:justify-center md:justify-center px-2 md:px-4 lg:px-6 lg:gap-8 md:gap-6 gap-4 py-8 mx-auto">
        {showToast && (
          <div className="toast toast-top toast-end z-60">
            <div className="alert alert-success">
              <span>Profile Updated Successfully</span>
            </div>
          </div>
        )}
        <div className="md:w-4xl lg:w-4xl h-full rounded-lg flex flex-col gap-4">
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
                className="w-32 h-32 border-2 border-base-content rounded-full absolute -bottom-10 left-10"
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
            <h2 className="font-merriweather text-xl font-semibold">
              General Information
            </h2>
            <hr className="text-accent" />
            <p className="text-lg text-base-content/65">{about}</p>
          </section>

          <GitHub gitHub={gitHub} />

          {projects !== null && projects.length !== 0 ? (
            <section className="p-6 rounded-lg bg-base-200/50 dark:border border-gray-400">
              <div className="flex flex-1 flex-col gap-2 justify-between">
                <h2 className="text-xl font-merriweather font-semibold">
                  Projects
                </h2>
                <hr className="text-gray-400" />
                <ProjectCard />
              </div>
            </section>
          ) : (
            <p></p>
          )}
        </div>

        <div className="md:w-xl lg:w-xl space-y-6">
          <div className="border border-gray-400 bg-base-200/50 p-6  max-h-48 rounded-lg flex flex-col gap-2">
            <div
              onClick={() => dispatch(editSetting(true))}
              className="flex justify-between cursor-pointer items-center"
            >
              <p>Edit Profile</p>
              <FiEdit className="w-5 h-5" />
            </div>
            <Link
              to={"/connections"}
              className="flex justify-between cursor-pointer items-center"
            >
              <p>Connections</p>
              <FiUsers className="w-5 h-5" />
            </Link>
            <Link
              to={"/requests"}
              className="flex justify-between cursor-pointer items-center"
            >
              <p>Requests</p>
              <FiUserPlus className="w-5 h-5" />
            </Link>
            <Link
              to={"/communities"}
              className="flex justify-between cursor-pointer items-center"
            >
              <p>Communities</p>
              <FiMessageSquare className="w-5 h-5" />
            </Link>
          </div>

          <div className="border border-gray-400 bg-base-200/50 p-6  max-h-48 rounded-lg flex flex-col gap-2">
            <div className="flex justify-between cursor-pointer items-center">
              <p>Email</p>
              <p className="text-wrap">{emailId}</p>
            </div>
            <div className="flex justify-between cursor-pointer items-center">
              <p>Phone</p>
              <p>{phoneNo}</p>
            </div>
            {age && (
              <div className="flex justify-between cursor-pointer items-center">
                <p>Age</p>
                <p>{age}</p>
              </div>
            )}
          </div>

          <section className="flex flex-col p-6 bg-base-200/50  rounded-lg gap-2 border border-gray-400">
            <h1 className=" font-merriweather text-lg">Skills</h1>
            <hr className="" />
            <div className="flex flex-wrap gap-2">
              {skills &&
                skills.map((skill) => (
                  <span key={skill} className="text-base-content">
                    {skill}
                  </span>
                ))}
            </div>
          </section>
        </div>
      </div>
    ) : (
      <EditProfileForm setShowToast={setShowToast} user={user} />
    )
  ) : (
    <div className="flex justify-center mx-auto w-52 flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
      <div className="skeleton h-32 w-full"></div>
    </div>
  );
};

export default Profile;
