import { useSelector } from "react-redux";
import Feed from "./Feed";

/* eslint-disable react/prop-types */
const EditProfile = ({ user }) => {
  const { firstName, lastName, about, phoneNo, emailId } = user;
  const edit = useSelector((store) => store.edit);

  return edit == true ? (
    <div className="p-6 flex items-center bg-[#f6f5ec] min-h-screen bg-gradient-to-bl from-red-100 to-pink-400">
      <div className="container mx-auto">
        <div className="bg-[#f6f5ec] rounded-lg shadow-[10px_10px_0px_black]  p-8 mb-6 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-gray-500 font-bold">
              Personal Information
            </h2>
            <button className="text-blue-500 hover:underline">Edit</button>
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
              <label className="block text-gray-800 font-bold mb-2">Bio</label>
              <p className="text-gray-500 font-semibold">{about}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-gray-500 font-bold">Email Address</h2>
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
  ) : (
    <Feed />
  );
};

export default EditProfile;
