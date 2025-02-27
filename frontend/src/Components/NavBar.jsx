/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { FiAlignJustify } from "react-icons/fi";
import logo from "../img/logo.png";
import { FiUsers } from "react-icons/fi";
import { FiToggleLeft, FiToggleRight, FiHome } from "react-icons/fi";
import { useState, useEffect } from "react";

const NavBar = ({ setOpenSideBar }) => {
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
    user != null && (
      <div className="navbar bg-white dark:bg-black flex items-center gap-6 justify-around">
        <div className="flex-1 mx-5">
          <FiAlignJustify
            onClick={() => setOpenSideBar(true)}
            className="w-8 h-8 cursor-pointer"
          />
          <Link
            to={"/home"}
            className="btn btn-ghost text-2xl dark:text-white text-black"
          >
            <img className="w-12 h-12 bg-white rounded-2xl" src={logo} />
            <p>evity</p>
          </Link>
        </div>

        <Link
          to={"/"}
          className="cursor-pointer flex flex-col text-gray-500 text-sm"
        >
          <FiHome className="w-6 h-6" />
          <p>Home</p>
        </Link>

        <Link
          to={"/connections"}
          className="flex flex-col text-gray-500 cursor-pointer"
        >
          <FiUsers className="w-6 h-6" />
          <p className="text-sm">My Network</p>
        </Link>

        <div className="cursor-pointer">
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
                  alt="Tailwind CSS Navbar component"
                  className="bg-white w-10 h-10"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-gray-600 text-base bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
