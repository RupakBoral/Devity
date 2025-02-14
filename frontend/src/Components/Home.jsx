import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const userData = useSelector((store) => store.user);

  return (
    <div>
      <div>{!userData && <Link to={"/login"}>Login</Link>}</div>
      <p>Home</p>
    </div>
  );
};

export default Home;
