import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { useEffect } from "react";
import SideBar from "./SideBar";
import { useState } from "react";
import NavBar from "./NavBar";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [OpenSideBar, setOpenSideBar] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (e) {
      if (e.response.status === 401) {
        return navigate("/login");
      }
      return navigate("/error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div
      className={`w-full ${!OpenSideBar ? "flex-col" : ""} ${
        user == null ? "" : "flex"
      } bg-stone-200 dark:bg-stone-800`}
    >
      {user != null ? (
        OpenSideBar ? (
          <SideBar OpenSideBar={OpenSideBar} setOpenSideBar={setOpenSideBar} />
        ) : (
          <NavBar setOpenSideBar={setOpenSideBar} />
        )
      ) : (
        <p></p>
      )}
      <Outlet />
    </div>
  );
};

export default Body;
