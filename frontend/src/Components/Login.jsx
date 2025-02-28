import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import LoginImg from "../img/LoginImg.png";
import logo from "../img/logo.png";
import Feed from "./Feed";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (e) {
      setError(e?.response?.data || "Login failed. Try again.");
    }
  };

  const user = useSelector((store) => store.user);

  return user !== null ? (
    <div className="flex overflow-x-hidden items-center min-h-screen bg-white">
      <img src={LoginImg} className="w-1/2 h-screen" />

      <div className="mx-auto rounded-2xl p-8 text-center space-y-8">
        <div className="flex items-center justify-center text-black">
          <img src={logo} className="w-20 h-20" />
          <h3 className="font-semibold text-xl">evity</h3>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="w-full p-3 border-b-2 text-black border-black focus:outline-none focus:ring-2 focus:ring-white  bg-transparent"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-b-2 text-black border-black  focus:outline-none focus:ring-2 focus:ring-white bg-transparent"
            placeholder="Password"
          />
        </div>

        {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}

        <button
          className="w-full bg-black text-white font-bold py-3 mt-4 rounded-sm hover:bg-white hover:text-black transition shadow-md"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="mt-4 text-black font-semibold">
          New here?
          <Link
            to="/signUp"
            className="text-slate-900 font-bold underline ml-1"
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
