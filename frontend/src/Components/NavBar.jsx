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
      <div className="navbar bg-white dark:bg-black flex items-center gap-6 justify-around">
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
          className="dark:hover:text-white hover:text-black cursor-pointer flex flex-col text-gray-400 text-sm"
        >
          <FiHome className="w-6 h-6" />
          <p>Home</p>
        </Link>

        <Link
          to={"/connections"}
          className="flex flex-col dark:hover:text-white hover:text-black  text-gray-400 cursor-pointer"
        >
          <FiUsers className="w-6 h-6" />
          <p className="text-sm">My Network</p>
        </Link>

        <Link
          to={"/requests"}
          className="flex flex-col dark:hover:text-white hover:text-black  text-gray-400 cursor-pointer"
        >
          <FiUserPlus className="w-6 h-6" />
          <p className="text-sm">Requests</p>
        </Link>

        <div className="cursor-pointer dark:hover:text-white hover:text-black">
          {mode === "light" ? (
            <div onClick={() => setMode("dark")}>
              <FiToggleLeft className="w-8 h-8" />
            </div>
          ) : mode === "dark" ? (
            <div onClick={() => setMode("light")}>
              <FiToggleRight className="w-8 h-8" />
            </div>
          ) : (
            <p></p>
          )}
        </div>

        <div className="flex-none gap-2 mx-5">
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="rounded-full">
                <img
                  className="bg-white w-10 h-10 border-2 border-black dark:border-white rounded-full "
                  alt="Tailwind CSS Navbar component"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-gray-600 text-base bg-white dark:bg-stone-700 dark:text-gray-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
