/* eslint-disable react/prop-types */
import axios from "axios";
import { lazy, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { BASE_URL } from "../../utils/constants";
import { editSetting } from "../../utils/editSlice";
import uploadImage from "../../utils/uploadImage";
const Social = lazy(() => import("./EditProfile/Social"));
const EditProjects = lazy(() => import("./EditProfile/EditProjects"));
import { compressBase64 } from "../../utils/constants";
import handleChange from "../../utils/handleChange";

const EditProfileForm = ({ setShowToast, user }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNo: user.phoneNo,
    age: user.age,
    about: user.about,
    skills: user.skills,
    photoUrl: user.photoUrl,
    BgUrl: user.BgUrl,
    gitHub: user.gitHub,
    linkedin: user.linkedin,
  });

  const [photoUpload, setPhotoUpload] = useState("Upload");
  const [BgUpload, setBgUpload] = useState("Upload");
  const [err, setErr] = useState("");
  const emailId = user.emailId;

  const saveProfile = async () => {
    const {
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
    } = formData;
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
      // console.error("Error:", e);
      setErr(e.response?.data?.message || "Something went wrong!");
    }
  };

  const handlePhotoUpload = async (event, type) => {
    try {
      event.preventDefault();
      if (type === "photoUrl") setPhotoUpload("Uploading..");
      else setBgUpload("Uploading..");
      const fileInput = event.target.elements[type];
      const file = fileInput.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const compressedBase64 = await compressBase64(reader.result);
        const secure_url = await uploadImage(compressedBase64, setErr);

        if (type === "photoUrl")
          setFormData((prev) => ({ ...prev, photoUrl: secure_url }));
        else setFormData((prev) => ({ ...prev, BgUrl: secure_url }));

        if (type === "photoUrl") setPhotoUpload("Uploaded");
        else setBgUpload("Uploaded");
      };
    } catch (err) {
      setErr(err);
      if (type === "photoUrl") setPhotoUpload("Upload Failed");
      else setBgUpload("Upload Failed");
    } finally {
      setTimeout(() => {
        setErr("");
      }, 2000);
    }
  };

  const [editType, setEditType] = useState("personal");

  return (
    <div className="w-[80%] mx-auto flex flex-col lg:flex-row justify-center gap-6 pt-24 py-10 px-4 min-h-screen">
      <div className="w-full lg:w-fit order-1">
        <div className="flex mx-4 flex-row lg:flex-col text-sm md:text-base lg:text-lg gap-2 justify-around border border-accent rounded-lg p-1 md:p-4 lg:p-4">
          <h3
            onClick={() => setEditType("personal")}
            className={`cursor-pointer px-2 py-1 rounded-md text-center ${
              editType === "personal"
                ? "bg-primary text-white font-semibold"
                : "hover:bg-accent"
            }`}
          >
            Personal
          </h3>
          <h3
            onClick={() => setEditType("social")}
            className={`cursor-pointer px-2 py-1 rounded-md text-center ${
              editType === "social"
                ? "bg-primary text-white font-semibold"
                : "hover:bg-accent"
            }`}
          >
            Social
          </h3>
          <h3
            onClick={() => setEditType("project")}
            className={`cursor-pointer px-2 py-1 rounded-md text-center ${
              editType === "project"
                ? "bg-primary text-white font-semibold"
                : "hover:bg-accent"
            }`}
          >
            Projects
          </h3>
        </div>
      </div>

      <div className="flex-1 w-full max-w-2xl border border-accent overflow-hidden py-5 rounded-lg mx-auto order-2">
        <h3 className="text-xl text-center">Details</h3>

        {editType === "personal" ? (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form>
                <label className="block font-bold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange(e, setFormData)}
                  className="input input-bordered w-full"
                />
              </form>

              <form>
                <label className="block font-bold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange(e, setFormData)}
                  className="input input-bordered w-full"
                />
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <form>
                <label className="font-bold">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={(e) => handleChange(e, formData)}
                  className="input input-bordered w-full"
                />
              </form>

              <form>
                <label className="font-bold">Phone</label>
                <input
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={(e) => handleChange(e, setFormData)}
                  className="input input-bordered w-full"
                />
              </form>
            </div>

            <form>
              <label className="block font-bold">Email</label>
              <input
                type="email"
                value={emailId}
                readOnly
                className="input input-bordered w-full"
              />
            </form>

            <form
              className="flex-1 flex-col justify-around"
              onSubmit={(event) => handlePhotoUpload(event, "photoUrl")}
            >
              <label className="block font-bold">Profile Photo</label>
              <input
                type="file"
                name="photoUrl"
                accept=".jpg, .jpeg, .png, .webp"
                className="file-input w-4/5"
              />
              <button
                type="submit"
                className="cursor-pointer btn btn-accent w-1/5"
              >
                {photoUpload}
              </button>
            </form>

            <form
              className="flex-1 flex-col justify-around"
              onSubmit={(event) => handlePhotoUpload(event, "BgUrl")}
            >
              <label className="block font-bold">Background Photo</label>
              <input
                type="file"
                name="BgUrl"
                accept=".jpg, .jpeg, .png, .webp"
                className="file-input w-4/5"
              />
              <button
                type="submit"
                className="cursor-pointer btn btn-accent w-1/5"
              >
                {BgUpload}
              </button>
            </form>

            <form>
              <label className="block font-bold">About</label>
              <textarea
                minLength={10}
                maxLength={200}
                name="about"
                value={formData.about}
                onChange={(e) => handleChange(e, setFormData)}
                className="textarea input-bordered w-full min-h-20 max-h-72"
              ></textarea>
            </form>

            <form>
              <label className="block font-bold">Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={(e) => handleChange(e, setFormData)}
                className="input input-bordered w-full"
              />
            </form>
          </div>
        ) : editType === "social" ? (
          <Social
            gitHub={formData.gitHub}
            setGitHub={formData.setGitHub}
            linkedin={formData.linkedin}
            setLinkedin={formData.setLinkedin}
          />
        ) : (
          <EditProjects />
        )}

        {editType !== "project" && (
          <div className="mt-4">
            <div className="w-full sm:w-3/4 mx-auto flex flex-col sm:flex-row justify-around gap-3">
              <button
                onClick={() => dispatch(editSetting(false))}
                type="submit"
                className="btn btn-soft btn-error border border-accent mx-auto w-1/2 sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  saveProfile();
                }}
                type="submit"
                className="btn btn-soft btn-success border border-accent mx-auto w-1/2 sm:w-auto"
              >
                Save Profile
              </button>
            </div>
            <p className="font-semibold text-lg text-center mt-5 text-red-500">
              {err}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfileForm;
