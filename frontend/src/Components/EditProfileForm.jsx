/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { editSetting } from "../utils/editSlice";

const EditProfileForm = ({ setShowToast, user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phoneNo, setPhoneNo] = useState(user.phoneNo);
  const [skills, setSkills] = useState(user.skills);
  const [projects, setProjects] = useState(user.projects);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [BgUrl, setBgUrl] = useState(user.BgUrl);
  const [about, setAbout] = useState(user.about);
  const [gitHub, setGitHub] = useState(user.gitHub);
  const [err, setErr] = useState("");
  const emailId = user.emailId;

  const body = { firstName, lastName, phoneNo, about, skills, BgUrl, gitHub };
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

  return (
    <div className="flex items-center justify-center py-10 min-h-screen bg-gradient-to-br from-stone-100 to-stone-300 dark:from-stone-950 dark:to-stone-900">
      <div className="w-full max-w-4xl mx-auto border border-gray-200 overflow-hidden bg-white dark:bg-black rounded-lg">
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
                className="input dark:bg-stone-300 text-gray-500 input-bordered w-full bg-white"
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
                className="input dark:bg-stone-300 text-gray-500 input-bordered w-full bg-white"
              />
            </div>
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
              className="input dark:bg-stone-300 text-gray-500 input-bordered w-full bg-white"
            />
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
              className="input dark:bg-stone-300 text-gray-500 input-bordered w-full bg-white"
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
              className="input dark:bg-stone-300 text-gray-500 input-bordered w-full bg-white"
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
              className="input dark:bg-stone-300 text-gray-500 input-bordered w-full bg-white"
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
              className="input dark:bg-stone-300 min-h-20 max-h-72 text-gray-500 input-bordered w-full bg-white"
            ></textarea>
          </div>

          <div>
            <label className="block dark:text-white text-black font-bold">
              GitHub Username
            </label>
            <input
              type="text"
              name="gitHub"
              value={gitHub}
              onChange={(e) => setGitHub(e.target.value)}
              className="input dark:bg-stone-300 text-gray-500 input-bordered w-full bg-white"
            />
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
              className="input dark:bg-stone-300 text-gray-500 input-bordered w-full bg-white"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="block dark:text-white text-black font-bold">
              Projects
            </label>
            {projects.map((project, index) => {
              return (
                <div key={index} className="space-y-2">
                  <div className="flex gap-4 items-center">
                    <label className="text-black dark:text-white">Name</label>
                    <input
                      type="text"
                      name="projects"
                      value={project.PName}
                      onChange={(e) => {
                        const newProjects = [...projects];
                        newProjects[index] = e.target.value;
                        setProjects(newProjects);
                      }}
                      className="input dark:bg-stone-300 text-gray-600 input-bordered w-full bg-white"
                    />
                  </div>
                  <div className="flex gap-4 items-center">
                    <label className="text-black dark:text-white">
                      Description
                    </label>
                    <input
                      value={project.PDescription}
                      className="input dark:bg-stone-300 text-gray-600 input-bordered w-full bg-white"
                    ></input>
                  </div>
                  <div className="flex gap-4 items-center">
                    <label className="text-black dark:text-white font-semibold">
                      Skills{" "}
                    </label>
                    <input
                      className="input dark:bg-stone-300 rounded-lg text-gray-600 flex-1"
                      type="text"
                      name="PSkills"
                      value={project.PSkills}
                      onChange={() => {}}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              saveProfile();
            }}
            type="submit"
            className="p-2 hover:bg-stone-700 transition-all ease-in text-lg duration-700 border-0 rounded-md w-full mt-4 bg-stone-500 text-white"
          >
            Save Profile
          </button>

          <button
            onClick={() => dispatch(editSetting(false))}
            type="submit"
            className="p-2 hover:bg-stone-700 transition-all ease-in text-lg duration-700 border-0 rounded-md w-full mt-4 bg-stone-500 text-white"
          >
            Cancel
          </button>
          <p className="font-semibold text-lg text-red-500">{err}</p>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
