import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import Bg from "../img/Bg.jpg";

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

  return (
    user != null && (
      <div
        style={{
          backgroundImage: `url(${Bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="navbar border-b-8 border-b-red-500"
      >
        <div className="flex-1 mx-5">
          <Link to={"/home"} className="btn btn-ghost text-2xl text-black">
            🧑‍💻 Devity
          </Link>
        </div>
        <div className="flex-none gap-2 mx-5">
          <p className="text-black font-semibold">{user.firstName}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  className="bg-white"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
