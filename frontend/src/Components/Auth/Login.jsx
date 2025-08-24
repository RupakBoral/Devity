import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import LoginImg from "../../img/LoginImg.png";
import logo from "../../img/logo.png";
import Feed from "../Page/Feed";
import { homeSetting } from "../../utils/homeSlice";
import handleChange from "../../utils/handleChange";

const Login = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      const { emailId, password } = formData;
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(addUser(res.data));
      dispatch(homeSetting(false));
      navigate("/");
    } catch (e) {
      setError(e?.response?.data || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const user = useSelector((store) => store.user);

  return user === null ? (
    <div className="flex overflow-x-hidden items-center min-h-screen bg-stone-200">
      <img
        src={LoginImg}
        className="w-1/2 h-screen md:inline lg:inline hidden"
      />

      <div className="mx-auto rounded-2xl p-8 text-center space-y-8">
        <div className="flex items-center justify-center text-black">
          <img src={logo} className="w-20 h-20" />
          <h3 className="font-bold text-2xl text-black">evity</h3>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            name="emailId"
            value={formData.emailId}
            onChange={(e) => handleChange(e, setFormData)}
            className="w-full p-3 border-b-2 text-black placeholder:text-gray-500 border-black focus:outline-none text-lg font-serif bg-transparent"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e, setFormData)}
            className="w-full p-3 border-b-2 text-black border-black placeholder:text-gray-500 focus:outline-none text-lg font-serif bg-transparent"
            placeholder="Password"
          />
          {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full cursor-pointer bg-black text-white font-bold py-3 mt-4 rounded-sm hover:bg-white hover:text-black transition shadow-md"
            onClick={(event) => handleLogin(event)}
          >
            {loading ? (
              <p>
                Logging..
                <span className="loading loading-ring loading-xl "></span>
              </p>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-4 text-black font-semibold">
          New here?
          <Link
            to="/signUp"
            className="text-slate-900 cursor-pointer font-bold underline ml-1"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  ) : (
    <Feed />
  );
};

export default Login;
