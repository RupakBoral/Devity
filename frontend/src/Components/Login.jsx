import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import bgImage from "../img/Bg.jpg";
import LoginImg from "../img/LoginImg.jpg";

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

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex overflow-x-hidden items-center min-h-screen bg-pink-100"
    >
      <img src={LoginImg} className="w-1/2" />

      <div className="mx-auto border-4 border-black rounded-2xl p-8 shadow-[6px_6px_0px_black] max-w-sm w-full text-center bg-pink-300">
        <h2 className="text-3xl font-bold text-black mb-4">Welcome Back!</h2>
        <p className="text-black font-semibold mb-4">
          Login to continue your journey 🚀
        </p>

        <div className="space-y-4">
          <input
            type="text"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-pink-500 text-white placeholder-gray-200 shadow-md"
            placeholder="Enter Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-pink-500 text-white placeholder-gray-200 shadow-md"
            placeholder="Enter Password"
          />
        </div>

        {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}

        <button
          className="w-full bg-[#F50057] text-white font-bold py-3 mt-4 rounded-lg border-2 border-black hover:bg-black transition shadow-md"
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
  );
};

export default Login;
