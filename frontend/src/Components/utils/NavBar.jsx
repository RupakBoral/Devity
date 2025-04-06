/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { removeUser } from "../../utils/userSlice";
import logo from "../../img/logo.png";
import { FiHome, FiUserPlus, FiUsers, FiBriefcase } from "react-icons/fi";
import { useState, useEffect } from "react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const home = useSelector((store) => store.home);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const photoUrl = user.photoUrl;

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "black");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

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

  return home === false ? (
    <nav className="navbar fixed top-2 mx-4 md:mx-10 lg:mx-10  w-[92%] md:w-[94%] lg:w-[94%] rounded-lg backdrop-blur-xl z-60 m-0 flex items-center border-2 border-base-content gap-2 lg:gap-6 md:gap-6 justify-evenly md:justify-around lg:justify-around">
      <Link to={"/home"} className="group text-2xl flex gap-1 items-center">
        <img className="w-12 h-12 rounded-2xl" src={logo} />
        <span className="text-3xl font-bold animate-pulse md:inline lg:inline hidden bg-gradient-to-l from-violet-600 to-pink-400 text-transparent py-1 bg-clip-text">
          evity
        </span>
      </Link>

      <Link
        to={"/"}
        className=" hover:text-black flex flex-col gap-1 items-center text-gray-400 dark:hover:text-yellow-600 cursor-pointer"
      >
        <FiHome className="w-6 h-6" />
        <p className="font-merriweather hidden md:inline lg:inline">Home</p>
      </Link>

      <Link
        to={"/projects"}
        className="hover:text-black flex flex-col gap-1 items-center text-gray-400 dark:hover:text-yellow-600 cursor-pointer"
      >
        <FiBriefcase className="w-6 h-6" />
        <p className="font-merriweather hidden md:inline lg:inline">Projects</p>
      </Link>

      <Link
        to={"/connections"}
        className="flex flex-col gap-1 items-center dark:hover:text-yellow-600 hover:text-black  text-gray-400 cursor-pointer"
      >
        <FiUsers className="w-6 h-6" />
        <p className="font-merriweather hidden md:inline lg:inline">Network</p>
      </Link>

      <Link
        to={"/requests"}
        className="flex flex-col gap-1 items-center dark:hover:text-yellow-600 hover:text-black  text-gray-400 cursor-pointer"
      >
        <FiUserPlus className="h-6 w-6" />
        <p className="font-merriweather hidden md:inline lg:inline">Requests</p>
      </Link>

      <label className="swap swap-rotate text-gray-400 hover:dark:text-yellow-600">
        {/* this hidden checkbox controls the state */}
        <input
          type="checkbox"
          className="theme-controller"
          checked={theme === "black"}
          onChange={() =>
            setTheme(theme === "wireframe" ? "black" : "wireframe")
          }
        />
        {/* sun icon */}
        <svg
          className="swap-off h-6 w-6 md:h-10 md:w-10 lg:h-10 lg:w-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

        {/* moon icon */}
        <svg
          className="swap-on h-6 w-6 md:h-10 md:w-10 lg:h-10 lg:w-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>

      <div className="flex-none gap-2 mx-5 z-20">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="rounded-full w-8 h-8">
              <img src={photoUrl} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content text-base border rounded-box z-[1] mt-3 w-52 p-2 shadow-sm bg-base-100"
          >
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
              </Link>
            </li>

            <li>
              <Link to={"/home"} onClick={Logout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  ) : (
    <p></p>
  );
};

export default NavBar;
