import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CTA = () => {
  const user = useSelector((store) => store.user);
  return (
    <section
      id="get-started"
      className="py-20 bg-gradient-to-br to-orange-500 from-blue-800 text-white"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Workflow?
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90">
          Join thousands of satisfied users who have improved their productivity
          with our platform.
        </p>
        <Link
          to={user === null ? "/login" : "/"}
          className="btn btn-xl animate-pulse transition-all transition-duration-700 shadow-2xl rounded-sm bg-base-200 hover:bg-gradient-to-l from-violet-600 to-pink-400 border-0 hover:text-black"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default CTA;
