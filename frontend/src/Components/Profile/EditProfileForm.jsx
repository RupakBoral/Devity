/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { BASE_URL } from "../../utils/constants";
import { editSetting } from "../../utils/editSlice";
import Social from "./EditProfile/Social";
import ProjectForm from "./EditProfile/ProjectForm";

const EditProfileForm = ({ setShowToast, user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phoneNo, setPhoneNo] = useState(user.phoneNo);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [BgUrl, setBgUrl] = useState(user.BgUrl);
  const [gitHub, setGitHub] = useState(user.gitHub);
  const [projects, setProjects] = useState(user.projects);
  const [err, setErr] = useState("");
  const emailId = user.emailId;

  const body = {
    firstName,
    lastName,
    phoneNo,
    age,
    about,
    skills,
    photoUrl,
    BgUrl,
    gitHub,
    projects,
  };

  const saveProfile = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", body, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      dispatch(addUser(res?.data?.data));
      dispatch(editSetting(false));

      setErr("");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (e) {
      console.error("Error:", e);
      setErr(e.response?.data?.message || "Something went wrong!");
    }
  };

  const [editType, setEditType] = useState("personal");

  return (
    <div className="w-full flex justify-center gap-6 py-10 min-h-screen ">
      <div className="flex-1 max-w-2xl border border-gray-200 overflow-hidden py-5 rounded-lg">
        <h3 className="text-xl text-center">Details</h3>
        {editType === "personal" ? (
          <form className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block dark:text-white text-black font-bold">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input border border-gray-300 text-gray-300 input-bordered w-full "
                />
              </div>
              <div>
                <label className="block dark:text-white text-black font-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input border border-gray-300 text-gray-300 input-bordered w-full "
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-black dark:text-white font-bold">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input border border-gray-300 text-gray-300 input-bordered w-full "
                />
              </div>
              <div>
                <label className="text-black dark:text-white font-bold">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  className="input border border-gray-300 text-gray-300 input-bordered w-full "
                />
              </div>
            </div>

            <div>
              <label className="block dark:text-white text-black font-bold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={emailId}
                readOnly
                className="input border border-gray-300 text-gray-300 input-bordered w-full "
              />
            </div>

            <div>
              <label className="block dark:text-white text-black font-bold">
                Photo URL
              </label>
              <input
                type="url"
                name="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input border border-gray-300 text-gray-300 input-bordered w-full "
              />
            </div>

            <div>
              <label className="block dark:text-white text-black font-bold">
                Background URL
              </label>
              <input
                type="url"
                name="url"
                value={BgUrl}
                onChange={(e) => setBgUrl(e.target.value)}
                className="input border border-gray-300 text-gray-300 input-bordered w-full "
              />
            </div>

            <div>
              <label className="block dark:text-white text-black font-bold">
                About
              </label>
              <textarea
                minLength={10}
                maxLength={200}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="input border border-gray-300 min-h-20 max-h-72 text-gray-300 input-bordered w-full "
              ></textarea>
            </div>

            <div>
              <label className="block dark:text-white text-black font-bold">
                Skills
              </label>
              <input
                type="text"
                name="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="input border border-gray-300 text-gray-300 input-bordered w-full "
              />
            </div>
          </form>
        ) : editType === "social" ? (
          <Social gitHub={gitHub} setGitHub={setGitHub} />
        ) : (
          <ProjectForm projects={projects} setProjects={setProjects} />
        )}
        <div className="w-1/2 mx-auto flex justify-around">
          <button
            onClick={() => dispatch(editSetting(false))}
            type="submit"
            className="btn btn-soft btn-error border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              saveProfile();
            }}
            type="submit"
            className="btn btn-soft btn-success border border-gray-300"
          >
            Save Profile
          </button>
        </div>
        <p className="font-semibold text-lg text-center mt-5 text-red-500">
          {err}
        </p>
      </div>
      <div className="border border-white h-fit p-4 rounded-lg">
        <h3 onClick={() => setEditType("personal")} className="cursor-pointer">
          Personal Information
        </h3>
        <h3 onClick={() => setEditType("social")} className="cursor-pointer">
          Social Links
        </h3>
        <h3 onClick={() => setEditType("project")} className="cursor-pointer">
          Skills
        </h3>
      </div>
    </div>
  );
};

export default EditProfileForm;
