/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { BASE_URL } from "../../utils/constants";
import { editSetting } from "../../utils/editSlice";
import Social from "./EditProfile/Social";
import EditProjects from "./EditProfile/EditProjects";
import { compressBase64 } from "../../utils/constants";

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
  const [linkedin, setLinkedin] = useState(user.linkedin);
  const [err, setErr] = useState("");
  const emailId = user.emailId;

  const saveProfile = async () => {
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
      linkedin,
    };
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", body, {
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

  const handleBgUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Convert to Base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const compressedBase64 = await compressBase64(reader.result, 500, 0.4); // Reduce width & quality
        setBgUrl(compressedBase64);
      } catch (err) {
        setTimeout(() => {
          setErr(err);
        }, 2000);
      }
    };
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Convert to Base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const compressedBase64 = await compressBase64(reader.result, 500, 0.4); // Reduce width & quality
        setPhotoUrl(compressedBase64);
      } catch (err) {
        setTimeout(() => {
          setErr(err);
        }, 2000);
      }
    };
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
                <label className="block  font-bold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input border  input-bordered w-full "
                />
              </div>
              <div>
                <label className="block  font-bold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input border  input-bordered w-full "
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
                  className="input border  input-bordered w-full "
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
                  className="input border  input-bordered w-full "
                />
              </div>
            </div>

            <div>
              <label className="block  font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={emailId}
                readOnly
                className="input border  input-bordered w-full "
              />
            </div>
            <div className="flex justify-between">
              <div>
                <label className="block font-bold">Profile Photo</label>
                <input
                  onChange={(e) => handlePhotoUpload(e)}
                  type="file"
                  className="file-input"
                />
              </div>

              <div>
                <label className="block  font-bold">Background URL</label>
                <input
                  onChange={(e) => handleBgUpload(e)}
                  type="file"
                  className="file-input"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold">About</label>
              <textarea
                minLength={10}
                maxLength={200}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="input min-h-20 max-h-72 input-bordered w-full "
              ></textarea>
            </div>

            <div>
              <label className="block  font-bold">Skills</label>
              <input
                type="text"
                name="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="input border  input-bordered w-full "
              />
            </div>
          </form>
        ) : editType === "social" ? (
          <Social
            gitHub={gitHub}
            setGitHub={setGitHub}
            linkedin={linkedin}
            setLinkedin={setLinkedin}
          />
        ) : (
          <EditProjects />
        )}
        {editType !== "project" ? (
          <div>
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
        ) : (
          <p></p>
        )}
      </div>
      <div className="border border-white h-fit p-4 rounded-lg">
        <h3 onClick={() => setEditType("personal")} className="cursor-pointer">
          Personal Information
        </h3>
        <h3 onClick={() => setEditType("social")} className="cursor-pointer">
          Social Links
        </h3>
        <h3 onClick={() => setEditType("project")} className="cursor-pointer">
          Projects
        </h3>
      </div>
    </div>
  );
};

export default EditProfileForm;
