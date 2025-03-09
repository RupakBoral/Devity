import axios from "axios";
import { useRef, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SignUpImg from "../../img/LoginImg.png";
import Feed from "../Page/Feed";

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
        navigate("/");
      }
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  const user = useSelector((store) => store.user);

  return user === null ? (
    <div className="flex overflow-x-hidden items-center w-screen min-h-screen bg-stone-200">
      <img src={SignUpImg} className="w-1/2 h-screen" />

      <div className="mx-auto rounded-2xl p-8 max-w-lg text-center">
        <h2 className="text-3xl font-bold text-black mb-4">Join Us!</h2>
        <p className="text-black mb-4">
          Create an account and start exploring 🚀
        </p>

        <div className="space-y-4">
          <input
            type="text"
            onChange={(e) => (firstNameRef.current = e.target.value)}
            className="w-full p-3 font-semibold text-black font-serif bg-transparent border-b-2 border-black placeholder:text-gray-500 focus:outline-none placeholder:font-medium"
            placeholder="First Name"
          />
          <input
            type="text"
            onChange={(e) => (lastNameRef.current = e.target.value)}
            className="w-full p-3  font-semibold text-black  bg-transparent border-b-2 border-black font-serif placeholder:text-gray-500 focus:outline-none placeholder:font-medium"
            placeholder="Last Name"
          />
          <input
            type="tel"
            onChange={(e) => (phoneNoRef.current = e.target.value)}
            className="w-full p-3  font-semibold text-black  bg-transparent border-b-2 border-black font-serif focus:outline-none placeholder:text-gray-500 placeholder:font-medium"
            placeholder="Phone Number"
          />
          <input
            type="email"
            onChange={(e) => (emailIdRef.current = e.target.value)}
            className="w-full p-3  font-semibold text-black bg-transparent border-b-2 border-black font-serif focus:outline-none placeholder:text-gray-500 placeholder:font-medium "
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => (passwordRef.current = e.target.value)}
            className="w-full p-3 font-semibold text-black bg-transparent border-b-2 border-black font-serif placeholder:text-gray-500 focus:outline-none placeholder:font-medium"
            placeholder="Password"
          />
        </div>

        {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

        <button
          onClick={handleSignUp}
          className="w-full bg-black cursor-pointer text-white font-bold py-3 mt-4 rounded-sm hover:bg-white hover:text-black transition shadow-md"
        >
          Sign Up
        </button>

        <p className="mt-4 text-black">
          Already have an account?
          <Link
            to="/login"
            className="text-black cursor-pointer text-lg font-bold underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  ) : (
    <Feed />
  );
};

export default SignUp;
