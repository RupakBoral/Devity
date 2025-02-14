import axios from "axios";
import { useRef, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import bgImage from "../img/bg.jpg";
import SignUpImg from "../img/SignUpImg.jpg";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let firstNameRef = useRef("");
  let lastNameRef = useRef("");
  let phoneNoRef = useRef("");
  let emailIdRef = useRef("");
  let passwordRef = useRef("");

  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signUp",
        {
          firstName: firstNameRef.current,
          lastName: lastNameRef.current,
          phoneNo: phoneNoRef.current,
          emailId: emailIdRef.current,
          password: passwordRef.current,
        },
        { withCredentials: true }
      );
      setError("");
      if (res.status === 200) {
        dispatch(addUser(res?.data));
        navigate("/login");
      }
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex overflow-x-hidden items-center min-h-screen bg-pink-300"
    >
      <img src={SignUpImg} className="w-1/2" />

      <div className="border-4 mx-auto border-black rounded-2xl p-8 shadow-xl max-w-sm w-full text-center bg-pink-300">
        <h2 className="text-3xl font-bold text-black mb-4">Join Us!</h2>
        <p className="text-black mb-4">
          Create an account and start exploring 🚀
        </p>

        <div className="space-y-4">
          <input
            type="text"
            onChange={(e) => (firstNameRef.current = e.target.value)}
            className="w-full p-3 border-2 font-semibold text-black border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-400 placeholder-white shadow-md"
            placeholder="First Name"
          />
          <input
            type="text"
            onChange={(e) => (lastNameRef.current = e.target.value)}
            className="w-full p-3 border-2 font-semibold text-black border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-400 placeholder-white shadow-md"
            placeholder="Last Name"
          />
          <input
            type="tel"
            onChange={(e) => (phoneNoRef.current = e.target.value)}
            className="w-full p-3 border-2 font-semibold text-black border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-400 placeholder-white shadow-md"
            placeholder="Phone Number"
          />
          <input
            type="email"
            onChange={(e) => (emailIdRef.current = e.target.value)}
            className="w-full p-3 border-2 font-semibold text-black border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-400 placeholder-white shadow-md"
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => (passwordRef.current = e.target.value)}
            className="w-full p-3 font-semibold text-black border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-400 placeholder-white shadow-md"
            placeholder="Password"
          />
        </div>

        {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

        <button
          onClick={handleSignUp}
          className="w-full bg-[#F50057] text-white font-bold py-3 mt-4 rounded-lg border-2 border-black hover:bg-black transition shadow-md"
        >
          Sign Up
        </button>

        <p className="mt-4 text-black">
          Already have an account?
          <Link
            to="/login"
            className="text-black text-lg font-bold underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
