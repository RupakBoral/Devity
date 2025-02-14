import { Outlet, useNavigate } from "react-router-dom";
// import NavBar from "./NavBar";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { useEffect } from "react";
import SideBar from "./SideBar";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="flex w-full h-screen">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Body;
