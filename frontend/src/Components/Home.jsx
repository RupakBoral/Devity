import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-tl from-stone-100 to-stone-300 dark:from-stone-800 dark:to-stone-700">
      <div>
        <div className="flex flex-col">
          <Link to={"/signUp"}>Sign Up</Link>
          <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
