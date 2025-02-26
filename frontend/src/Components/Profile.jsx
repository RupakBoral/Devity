import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import ProfileBg from "../img/ProfileBg.jpg";
import SmallProjectCard from "./SmallProjectCard";
import { FiArrowRight, FiEdit, FiUsers, FiMessageSquare } from "react-icons/fi";
import EditProfileForm from "./EditProfileForm";
import Error from "./Error";
import { editSetting } from "../utils/editSlice";
import Loading from "./Loading";

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
    photoUrl,
    skills,
    projects,
  } = user;

  return user != null ? (
    !edit ? (
      <div className="w-screen h-full flex justify-center gap-6 bg-stone-200 py-6 dark:bg-stone-800">
        {showToast && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <span>Profile Updated Successfully</span>
            </div>
          </div>
        )}
        <div className="w-3/6 h-full rounded-lg flex flex-col gap-4">
          <section className="bg-white dark:bg-black rounded-lg ">
            <div className="relative rounded-lg">
              <img
                className="h-56 rounded-t-lg w-full object-cover"
                src={ProfileBg}
              />
              <img
                className="w-32 h-32 border-4 border-white rounded-full absolute -bottom-10 left-10"
                src={photoUrl}
              />
            </div>
            <div className="mt-12 p-6">
              <div className="flex gap-2">
                <h1 className="font-bold text-black text-lg">{firstName}</h1>
                <h1 className="font-bold text-black text-lg">{lastName}</h1>
              </div>
              <h3>Headline</h3>
            </div>
          </section>

          <div className="bg-white dark:bg-black p-6 rounded-lg flex flex-col gap-6 justify-between">
            <h2 className="text-black font-bold text-lg">
              General Information
            </h2>
            <hr />
            <p>{about}</p>
          </div>

          <section className="flex flex-col p-6 bg-white dark:bg-black rounded-lg">
            <h2 className="text-black font-bold text-lg">Skills</h2>
            <hr />
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-200 px-2 py-1 rounded-full"
                >
                  {skill}
                  <hr />
                </span>
              ))}
            </div>
          </section>

          {projects ? (
            <section className="bg-white dark:bg-black p-6 rounded-lg">
              <div className="flex flex-col gap-2 justify-between">
                <h2 className="text-lg font-bold text-black">Projects</h2>
                <hr />
                <SmallProjectCard projects={projects} />
                <hr />
                <button className="flex justify-center place-items-center gap-2">
                  Show all projects <FiArrowRight className="" />
                </button>
              </div>
            </section>
          ) : (
            <p></p>
          )}
        </div>

        <div className="w-1/6 p-6 bg-white dark:bg-black max-h-48 rounded-lg flex flex-col gap-2">
          <div
            onClick={() => dispatch(editSetting(true))}
            className="flex justify-between cursor-pointer items-center"
          >
            <p className="text-black dark:text-gray-100">Edit Profile</p>
            <FiEdit className="w-5 h-5" />
          </div>
          <div className="flex justify-between cursor-pointer items-center">
            <p className="text-black dark:text-gray-100">Connections</p>
            <FiUsers className="w-5 h-5" />
          </div>
          <div className="flex justify-between cursor-pointer items-center">
            <p className="text-black dark:text-gray-100">Messages</p>
            <FiMessageSquare className="w-5 h-5" />
          </div>
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
