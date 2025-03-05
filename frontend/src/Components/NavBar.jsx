/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import logo from "../img/logo.png";
import {
  FiToggleLeft,
  FiToggleRight,
  FiHome,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";
import { useState, useEffect } from "react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  const photoUrl = user.photoUrl;

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [mode]);

  return (
    user !== null && (
      <div className="navbar bg-white dark:bg-black flex items-center border-b border-[#FFFF00] gap-6 justify-around">
        <Link
          to={"/home"}
          className="group text-2xl dark:text-white text-black"
        >
          <img
            className="w-12 h-12 bg-gray-400 group-hover:bg-gray-300 dark:group-hover:bg-white rounded-2xl"
            src={logo}
          />
          <p className="text-gray-400 group-hover:text-black dark:group-hover:text-white">
            evity
          </p>
        </Link>

        <Link
          to={"/"}
          className=" hover:text-black flex flex-col gap-1 dark:hover:text-yellow-600 cursor-pointer text-gray-400"
        >
          <FiHome className="w-6 h-6" />
          <p className="font-merriweather">Home</p>
        </Link>

        <Link
          to={"/connections"}
          className="flex flex-col gap-1 dark:hover:text-yellow-600 hover:text-black  text-gray-400 cursor-pointer"
        >
          <FiUsers className="w-6 h-6" />
          <p className="font-merriweather">Network</p>
        </Link>

        <Link
          to={"/requests"}
          className="flex flex-col gap-1 dark:hover:text-yellow-600 hover:text-black  text-gray-400 cursor-pointer"
        >
          <FiUserPlus className="w-6 h-6" />
          <p className="font-merriweather">Requests</p>
        </Link>

        <div className="cursor-pointer flex flex-col gap-1 dark:hover:text-yellow-600 hover:text-black">
          {mode === "light" ? (
            <div onClick={() => setMode("dark")}>
              <FiToggleLeft className="w-8 h-8" />
              <p className="font-merriweather">light</p>
            </div>
          ) : mode === "dark" ? (
            <div onClick={() => setMode("light")}>
              <FiToggleRight className="w-8 h-8" />
              <p className="font-merriweather">dark</p>
            </div>
          ) : (
            <p></p>
          )}
        </div>

        <div className="flex-none gap-2 mx-5 z-20">
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="rounded-full dark:shadow-[0px_0px_5px_4px_#FFFFE0]">
                <img src={photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-gray-600 text-base bg-white dark:bg-black border dark:text-gray-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link to={"/home"} onClick={Logout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default NavBar;
