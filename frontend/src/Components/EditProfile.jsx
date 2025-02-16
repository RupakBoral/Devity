import { useSelector } from "react-redux";
import Feed from "./Feed";
import { useState } from "react";
import EditProfileForm from "./EditProfileForm";

/* eslint-disable react/prop-types */
const EditProfile = ({ setShowToast, user }) => {
  const { firstName, lastName, about, phoneNo, emailId } = user;
  const edit = useSelector((store) => store.edit);
  const [editBtn, setEditBtn] = useState(false);

  return edit == true ? (
    editBtn ? (
      <EditProfileForm
        setShowToast={setShowToast}
        user={user}
        setEditBtn={setEditBtn}
      />
    ) : (
      <div className="p-6 flex items-center bg-[#f6f5ec] min-h-screen bg-gradient-to-bl from-red-50 to-pink-300">
        <div className="container mx-auto bg-[#f6f5ec] border-2 border-gray-600 rounded-lg shadow-[10px_10px_0px_#fa4c50] mb-6 space-y-6">
          <div className="flex justify-between py-2 px-4 items-center  rounded-t-lg border border-b-gray-600">
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>
            <button
              onClick={() => setEditBtn(!editBtn)}
              className="text-blue-500 font-semibold text-lg hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="px-8 pb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl text-gray-500 font-bold">
                Personal Information
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 font-bold mb-2">
                  First Name
                </label>
                <p className="text-gray-500 font-semibold">{firstName}</p>
              </div>
              <div>
                <label className="block text-gray-800 font-bold mb-2">
                  Last Name
                </label>
                <p className="text-gray-400 font-semibold">{lastName}</p>
              </div>
              <div>
                <label className="block text-gray-800 font-bold mb-2">
                  Phone
                </label>
                <p className="text-gray-500 font-semibold">{phoneNo}</p>
              </div>
              <div>
                <label className="block text-gray-800 font-bold mb-2">
                  Bio
                </label>
                <p className="text-gray-500 font-semibold">{about}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl text-gray-500 font-bold">
                Email Address
              </h2>
            </div>

            <div>
              <label className="block text-gray-800 font-bold mb-2">
                Email Address
              </label>
              <p className="text-gray-500 font-semibold">{emailId}</p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl text-gray-500 font-bold">
                Social Connections
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 font-bold mb-2">
                  Linkedin
                </label>
                <p className="text-gray-500 font-semibold">{emailId}</p>
              </div>
              <div>
                <label className="block text-gray-800 font-bold mb-2">
                  Github
                </label>
                <p className="text-gray-500 font-semibold">{emailId}</p>
              </div>
              <div>
                <label className="block text-gray-800 font-bold mb-2">
                  Instagram
                </label>
                <p className="text-gray-500 font-semibold">{emailId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <Feed />
  );
};

export default EditProfile;
