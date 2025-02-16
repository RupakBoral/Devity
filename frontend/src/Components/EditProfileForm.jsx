/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const EditProfileForm = ({ setShowToast, user, setEditBtn }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phoneNo, setPhoneNo] = useState(user.phoneNo);
  const emailId = user.emailId;
  //   const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  //   const [about, setAbout] = useState(user.about);
  const [err, setErr] = useState("");

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          phoneNo,
          //   photoUrl
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setEditBtn(false);
      setErr("");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (e) {
      setErr(e.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f6f5ec]">
      <div className="shadow-[10px_10px_0px_#fa4c50] w-full max-w-4xl mx-auto border-2 border-black rounded-lg overflow-hidden">
        <div className="bg-gray-100 flex justify-between items-center px-3 py-2 border-b-2 border-black">
          <div className="flex gap-2">
            <span
              onClick={() => setEditBtn(false)}
              className="w-3 h-3 cursor-pointer bg-red-500 rounded-full"
            ></span>
            <span
              onClick={() => setEditBtn(false)}
              className="w-3 h-3 cursor-pointer bg-yellow-500 rounded-full"
            ></span>
            <span
              onClick={() => setEditBtn(false)}
              className="w-3 h-3 cursor-pointer bg-green-500 rounded-full"
            ></span>
          </div>
        </div>

        <form className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-black font-bold">First Name</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input text-gray-500 input-bordered w-full bg-white"
              />
            </div>
            <div>
              <label className="block text-black font-bold">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input text-gray-500 input-bordered w-full bg-white"
              />
            </div>
          </div>

          <div>
            <label className="text-black font-bold">Phone</label>
            <input
              type="tel"
              name="phone"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="input text-gray-500 input-bordered w-full bg-white"
            />
          </div>

          <div>
            <label className="block text-black font-bold">Email</label>
            <input
              type="email"
              name="email"
              value={emailId}
              readOnly
              className="input disabled text-gray-500 input-bordered w-full bg-white"
            />
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              saveProfile();
            }}
            type="submit"
            className="btn btn-primary w-full mt-4 bg-gradient-to-br from-red-400 to-red-100 text-black text-lg"
          >
            Save Profile
          </button>
          <p className="font-semibold text-lg text-red-500">{err}</p>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
