import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="w-screen h-screen bg-base-300">
      <div>
        {user === null ||
          (user.length === 0 && (
            <div className="flex flex-col">
              <Link to={"/signUp"}>Sign Up</Link>
              <Link to={"/login"}>Login</Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
