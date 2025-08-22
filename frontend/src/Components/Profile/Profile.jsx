import { lazy, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiEdit, FiUsers, FiMessageSquare, FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { editSetting } from "../../utils/editSlice";
const GitHub = lazy(() => import("./GitHub"));
const EditProfileForm = lazy(() => import("./EditProfileForm"));
const ViewProfile = lazy(() => import("./ViewProfile"));

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

  const { phoneNo, emailId, age, gitHub } = user;

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
        {user != null || user != undefined ? (
          <ViewProfile user={user} />
        ) : (
          <p></p>
        )}
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

          <GitHub gitHub={gitHub} />
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
