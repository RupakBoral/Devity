import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { lazy, useEffect } from "react";
const NavBar = lazy(() => import("./utils/NavBar"));

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (e) {
      if (e.response.status === 401) {
        return navigate("/home");
      }
      return navigate("/error");
    }
  };

  useEffect(() => {
    if (user === null || user.length === 0) return navigate("/home");
    fetchUser();
  }, []);

  return (
    <div className={`w-full "flex-col h-full gap-10 bg-transparent"}`}>
      {user !== null && user.length !== 0 ? <NavBar /> : <p></p>}
      <Outlet />
    </div>
  );
};

export default Body;
