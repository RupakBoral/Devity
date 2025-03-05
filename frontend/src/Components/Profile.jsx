import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import SmallProjectCard from "./SmallProjectCard";
import {
  FiArrowRight,
  FiEdit,
  FiUsers,
  FiMessageSquare,
  FiUserPlus,
} from "react-icons/fi";
import EditProfileForm from "./EditProfileForm";
import Error from "./Error";
import { editSetting } from "../utils/editSlice";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import GitHub from "./GitHub";

const Profile = () => {
  let user = useSelector((store) => store.user);
  const [showToast, setShowToast] = useState(false);
  const edit = useSelector((store) => store.edit);

  const dispatch = useDispatch();

  if (user === null) {
    return <Loading />;
  }

  const {
    firstName,
    lastName,
    about,
    // phoneNo,
    // emailId,
    gitHub,
    headline,
    BgUrl,
    photoUrl,
    skills,
    projects,
  } = user;

  return user !== null ? (
    !edit ? (
      <div className="w-screen h-full flex justify-center gap-6 py-8 bg-gradient-to-tl from-stone-100 to-stone-300 dark:from-black dark:to-stone-950">
        {showToast && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <span>Profile Updated Successfully</span>
            </div>
          </div>
        )}
        <div className="w-3/6 h-full rounded-lg flex flex-col gap-4">
          <section className="bg-white dark:bg-black rounded-lg dark:border border-gray-400">
            <div className="relative rounded-lg">
              <img
                className="h-56 rounded-t-lg w-full object-cover"
                src={BgUrl}
              />
              <img
                className="w-32 h-32 border-4 border-white rounded-full absolute -bottom-10 left-10"
                src={photoUrl}
              />
            </div>
            <div className="mt-12 p-6">
              <h1 className="font-bold font-montserrat text-2xl text-black dark:text-white">
                {firstName} {lastName}
              </h1>

              <h3 className="text-lg">{headline}</h3>
            </div>
          </section>

          <section className="bg-white dark:bg-black p-6 rounded-lg flex flex-col gap-2 justify-between dark:border border-gray-400">
            <h2 className="text-black dark:text-white font-merriweather text-xl font-semibold">
              General Information
            </h2>
            <hr />
            <p className="text-lg">{about}</p>
          </section>

          {projects ? (
            <section className="bg-white dark:bg-black p-6 rounded-lg dark:border border-gray-400">
              <div className="flex flex-col gap-4 justify-between">
                <h2 className="text-xl font-merriweather font-bold text-black dark:text-gray-200">
                  Projects
                </h2>
                <hr />
                <SmallProjectCard projects={projects} />
                <hr />
                <button className="flex justify-center font-montserrat place-items-center gap-2">
                  Show all projects{" "}
                  <FiArrowRight className="animate-bounce w-5 h-5" />
                </button>
              </div>
            </section>
          ) : (
            <p></p>
          )}

          <GitHub gitHub={gitHub} />
        </div>

        <div className="w-1/6 space-y-6">
          <div className="dark:border border-gray-400  p-6 bg-white dark:bg-black max-h-48 rounded-lg flex flex-col gap-2">
            <div
              onClick={() => dispatch(editSetting(true))}
              className="flex justify-between cursor-pointer items-center"
            >
              <p className="text-black dark:text-gray-100">Edit Profile</p>
              <FiEdit className="w-5 h-5" />
            </div>
            <Link
              to={"/connections"}
              className="flex justify-between cursor-pointer items-center"
            >
              <p className="text-black dark:text-gray-100">Connections</p>
              <FiUsers className="w-5 h-5" />
            </Link>
            <Link
              to={"/requests"}
              className="flex justify-between cursor-pointer items-center"
            >
              <p className="text-black dark:text-gray-100">Requests</p>
              <FiUserPlus className="w-5 h-5" />
            </Link>
            <div className="flex justify-between cursor-pointer items-center">
              <p className="text-black dark:text-gray-100">Messages</p>
              <FiMessageSquare className="w-5 h-5" />
            </div>
          </div>

          <div className="dark:border border-gray-400 p-6 bg-white dark:bg-black max-h-48 rounded-lg flex flex-col gap-2">
            <div className="flex justify-between cursor-pointer items-center">
              <p className="text-black dark:text-gray-100">Email</p>
              <p>{user.emailId}</p>
            </div>
            <div className="flex justify-between cursor-pointer items-center">
              <p className="text-black dark:text-gray-100">Phone</p>
              <p>{user.phoneNo}</p>
            </div>
            <div className="flex justify-between cursor-pointer items-center">
              <p className="text-black dark:text-gray-100">GitHub</p>
              <p>{gitHub}</p>
            </div>
          </div>

          <section className="flex flex-col p-6 bg-white dark:bg-black rounded-lg gap-2 dark:border border-gray-400">
            <h2 className="text-black dark:text-gray-200 font-bold font-merriweather text-xl">
              Skills
            </h2>
            <hr />
            <div className="flex flex-wrap gap-2">
              {skills &&
                skills.map((skill) => (
                  <span className="text-lg" key={skill}>
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
    <Error />
  );
};

export default Profile;
