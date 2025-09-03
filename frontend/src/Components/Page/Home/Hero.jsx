import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { homeSetting } from "../../../utils/homeSlice";

const Hero = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <section
      id="home"
      className="text-center py-28 border-b border-accent/80 p-6 bg-gradient-to-bl from-gray-900 via-gray-800 to-gray-950"
    >
      <h1
        className="md:text-6xl text-3xl font-bold drop-shadow-lg 
    bg-gradient-to-r from-pink-500 from-30% via-50% via-violet-500 to-white 
    bg-clip-text text-transparent"
      >
        Devity
      </h1>

      <p className="mt-6 text-xl max-w-2xl mx-auto text-gray-300">
        Share projects. Exchange ideas. Collaborate. Grow together. For free.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Link
          onClick={() => dispatch(homeSetting(false))}
          to={user === null ? "/login" : "/"}
          className="btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:opacity-90"
        >
          Get Started
        </Link>
        <Link
          onClick={() => dispatch(homeSetting(false))}
          to={user === null ? "/login" : "/"}
          className="btn border border-gray-500 text-gray-200 hover:bg-gray-800 hover:text-white"
        >
          Login
        </Link>
      </div>
    </section>
  );
};

export default Hero;
