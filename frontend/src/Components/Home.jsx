import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const userData = useSelector((store) => store.user);

  return <div>{!userData && <Link to={"/login"}>Login</Link>}</div>;
};

export default Home;
