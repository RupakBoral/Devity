import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy, useEffect } from "react";
const NavBar = lazy(() => import("./utils/NavBar"));

const Body = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user === null || user.length === 0) return navigate("/home");
  }, []);

  return (
    <div className={`w-full "flex-col h-full gap-10 bg-black"}`}>
      {user !== null && user.length !== 0 ? <NavBar /> : <p></p>}
      <Outlet />
    </div>
  );
};

export default Body;
