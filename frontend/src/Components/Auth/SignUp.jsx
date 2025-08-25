import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SignUpImg from "../../img/LoginImg.webp";
import Feed from "../Page/Feed";
import logo from "../../img/logo.webp";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    emailId: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const { firstName, lastName, phoneNo, emailId, password } = formData;
      const res = await axios.post(
        BASE_URL + "/signUp",
        {
          firstName,
          lastName,
          phoneNo,
          emailId,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        dispatch(addUser(res?.data));
        navigate("/");
      }
      setError("");
    } catch (err) {
      setError(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const user = useSelector((store) => store.user);

  return user === null ? (
    <div className="flex overflow-x-hidden items-center w-screen min-h-screen bg-[#f9efe5]">
      <img
        src={SignUpImg}
        alt="image"
        loading="lazy"
        className="w-1/2 h-screen md:inline lg:inline hidden object-contain"
      />

      <div className="mx-auto rounded-2xl p-8 max-w-lg text-center bg-white/50">
        <div className="flex items-center justify-center text-black">
          <img src={logo} className="w-20 h-20" alt="logo" loading="lazy" />
          <h3 className="-ml-4 font-bold text-2xl text-black">evity</h3>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            name="firstName"
            onChange={handleChange}
            className="w-full p-3 font-semibold text-black font-serif bg-transparent border-b-2 border-black placeholder:text-gray-500 focus:outline-none placeholder:font-medium"
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            className="w-full p-3  font-semibold text-black  bg-transparent border-b-2 border-black font-serif placeholder:text-gray-500 focus:outline-none placeholder:font-medium"
            placeholder="Last Name"
          />
          <input
            type="tel"
            name="phoneNo"
            onChange={handleChange}
            className="w-full p-3  font-semibold text-black  bg-transparent border-b-2 border-black font-serif focus:outline-none placeholder:text-gray-500 placeholder:font-medium"
            placeholder="Phone Number"
          />
          <input
            type="email"
            name="emailId"
            onChange={handleChange}
            className="w-full p-3  font-semibold text-black bg-transparent border-b-2 border-black font-serif focus:outline-none placeholder:text-gray-500 placeholder:font-medium "
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="w-full p-3 font-semibold text-black bg-transparent border-b-2 border-black font-serif placeholder:text-gray-500 focus:outline-none placeholder:font-medium"
            placeholder="Password"
          />
        </form>

        {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

        <button
          onClick={handleSignUp}
          className="w-full bg-black cursor-pointer text-white font-bold py-3 mt-4 rounded-sm hover:bg-white hover:text-black transition shadow-md"
        >
          {loading ? "Signing Up..." : "Sign Up"}
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
