import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { useState } from "react";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [showToast, setShowToast] = useState(false);

  return (
    user && (
      <div className="bg-red-50 w-screen h-screen">
        {showToast && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <span>Profile Updated Successfully</span>
            </div>
          </div>
        )}
        <EditProfile setShowToast={setShowToast} user={user} />
      </div>
    )
  );
};

export default Profile;
