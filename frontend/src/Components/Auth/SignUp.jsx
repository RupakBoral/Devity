import axios from "axios";
import { useState } from "react";
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
    <div className="flex overflow-x-hidden items-center w-screen min-h-screen bg-stone-200">
      <img
        src={SignUpImg}
        className="w-1/2 h-screen md:inline lg:inline hidden"
      />

      <div className="mx-auto rounded-2xl p-8 max-w-lg text-center">
        <h2 className="text-3xl font-bold text-black mb-4">Join Us!</h2>
        <p className="text-black mb-4">
          Create an account and start exploring 🚀
        </p>

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
