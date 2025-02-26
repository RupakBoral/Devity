/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { editSetting } from "../utils/editSlice";
import logo from "../img/logo.png";
import { FiAlignJustify } from "react-icons/fi";

const SideBar = ({ OpenSideBar, setOpenSideBar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const edit = useSelector((store) => store.edit);

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

  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [mode]);

  if (user === null) return;
  const { emailId, phoneNo, photoUrl } = user;

  return user ? (
    <div className="w-2/6 flex flex-col dark:bg-stone-900 bg-stone-300 border-r-2 border-r-gray-400 space-y-4">
      <div className="bg-gradient-to-br to-stone-700 from-stone-400 border-b-2 border-b-stone-600 p-2 text-white text-lg font-semibold flex  py-2 px-4 items-center">
        <div className="flex justify-around items-center">
          <button
            className=" text-black"
            onClick={() => setOpenSideBar(!OpenSideBar)}
          >
            <FiAlignJustify className="w-10 h-10 text-white" />
          </button>
          <Link
            className="hover:scale-105 hover:opacity-100 opacity-90 transition-all duration-700 rounded-xl flex items-center"
            to={"/"}
          >
            <img className="w-12 h-12" src={logo} />
            <p>evity</p>
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-stone-500 dark:text-stone-100 px-2 py-3 text-slate-800 font-semibold text-lg">
        <Link to="/connections">Connections</Link>
      </div>

      <div className="flex flex-col">
        <button
          onClick={() => handleEdit()}
          className="cursor-pointer flex justify-between dark:text-stone-100 text-gray-700 font-bold font-mono text-lg px-4"
        >
          <p>ACCOUNT SETTINGS</p>
          <span>{">"}</span>
        </button>
        <div className="bg-white dark:bg-stone-500 dark:text-stone-100 font-semibold text-gray-600 text-lg">
          <div className="py-2 border-y-2 border-gray-400 flex justify-between px-4">
            <p>Email</p>
            <p>{emailId}</p>
          </div>
          <div className="py-2 border-b-2 border-gray-400 flex justify-between px-4">
            <p>Phone Number</p>
            <p>{phoneNo}</p>
          </div>
        </div>
        <hr />
      </div>

      <div className="flex flex-col">
        <h2 className="text-gray-700 dark:text-stone-100 font-bold font-mono text-lg pl-4">
          APPERANCE
        </h2>
        <div className="bg-white dark:bg-stone-500 dark:text-stone-100 font-semibold text-gray-600 text-lg">
          <div
            onClick={() => setMode("light")}
            className="py-2 cursor-pointer border-collapse border-b-2 border-gray-400 flex justify-between dark:text-stone-200 text-gray-600 px-4 text-lg"
          >
            <p>Light Mode</p>
            <p>{mode === "light" ? "✔️" : ""}</p>
          </div>

          <div
            onClick={() => setMode("dark")}
            className="py-2 cursor-pointer border-collapse border-b-2 border-gray-400 flex justify-between px-4"
          >
            <p>Dark Mode</p>
            <p>{mode === "dark" ? "✔️" : ""}</p>
          </div>
        </div>
        <hr />
      </div>

      <button
        onClick={Logout}
        className="py-3 w-full dark:bg-stone-500 dark:text-stone-100 bg-white border-collapse border-y-2 border-gray-400 flex justify-between text-gray-600 px-4 text-lg"
      >
        <p>Logout</p>
      </button>
    </div>
  ) : (
    <p></p>
  );
};

export default SideBar;
