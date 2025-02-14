import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { editSetting } from "../utils/editSlice";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const edit = useSelector((store) => store.edit);
  const [mode, setMode] = useState("system");

  const Logout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/home");
    } catch (err) {
      if (err.response.status === 401) return navigate("/home");
      navigate("/error");
    }
  };

  const handleEdit = () => {
    try {
      dispatch(editSetting(!edit));
    } catch (err) {
      if (err.response.status === 401) return navigate("/home");
      navigate("/error");
    }
  };

  if (user === null) return;
  const { emailId, phoneNo, photoUrl, firstName } = user;

  return (
    user && (
      <div className="w-2/5 h-screen bg-[#f6f5ec] border-r border-r-gray-400 space-y-4">
        <div className="py-6 bg-gradient-to-tl from-pink-700 to-red-300 p-4 text-white text-lg font-semibold flex justify-between items-baseline">
          <Link
            className="hover:scale-105 hover:opacity-100 opacity-90 transition-all duration-700 p-2 rounded-xl"
            to={"/"}
          >
            Devity
          </Link>
          <Link to={"/profile"} className="flex gap-2 place-content-baseline">
            <h2>{firstName}</h2>
            <img src={photoUrl} className="w-10 h-10 rounded-full" />
          </Link>
        </div>

        <div className="flex flex-col">
          <button
            onClick={() => handleEdit()}
            className="cursor-pointer flex justify-between text-gray-500 font-bold font-mono text-lg px-4"
          >
            <p>ACCOUNT SETTINGS</p>
            <span>{">"}</span>
          </button>
          <div className="py-6 bg-white border-collapse border-y border-gray-400 flex justify-between text-gray-600 px-4 text-lg">
            <p>Email</p>
            <p>{emailId}</p>
          </div>
          <div className="py-6 bg-white border-collapse border-y border-gray-400 flex justify-between text-gray-600 px-4 text-lg">
            <p>Phone Number</p>
            <p>{phoneNo}</p>
          </div>
          <hr />
        </div>

        <div className="flex flex-col">
          <h2 className="text-gray-500 font-bold font-mono text-lg pl-4">
            APPERANCE
          </h2>
          <div
            onClick={() => setMode("system")}
            className="py-6 bg-white border-collapse border-y border-gray-400 flex justify-between text-gray-600 px-4 text-lg"
          >
            <p>Use Sytem Setting</p>
            <p>{mode === "system" ? "✔️" : ""}</p>
          </div>
          <div
            onClick={() => setMode("light")}
            className="py-6 bg-white border-collapse border-y border-gray-400 flex justify-between text-gray-600 px-4 text-lg"
          >
            <p>Light Mode</p>
            <p>{mode === "light" ? "✔️" : ""}</p>
          </div>
          <div
            onClick={() => setMode("dark")}
            className="py-6 bg-white border-collapse border-y border-gray-400 flex justify-between text-gray-600 px-4 text-lg"
          >
            <p>Dark Mode</p>
            <p>{mode === "dark" ? "✔️" : ""}</p>
          </div>
          <hr />
        </div>

        <button
          onClick={Logout}
          className="py-6 w-full bg-white border-collapse border-y border-gray-400 flex justify-between text-gray-600 px-4 text-lg"
        >
          <p>Logout</p>
        </button>
      </div>
    )
  );
};

export default SideBar;
