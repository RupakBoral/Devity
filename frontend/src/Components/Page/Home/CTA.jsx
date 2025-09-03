import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { homeSetting } from "../../../utils/homeSlice";

const CTA = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <section
      id="get-started"
      className="py-20 p-6 text-center bg-gradient-to-tr from-gray-900 via-gray-800 to-black text-white"
    >
      <h2 className="text-3xl font-bold mb-4">
        Start Sharing & Collaborating Today
      </h2>
      <p className="mb-6">
        Join thousands of developers helping each other and growing together.
      </p>
      <Link
        onClick={() => dispatch(homeSetting(false))}
        to={user === null ? "/login" : "/"}
        className="btn btn-accent text-white px-6 shadow-lg"
      >
        Join for Free
      </Link>
    </section>
  );
};

export default CTA;
