import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col space-y-4 justify-center items-center">
      <p className="font-semibold text-md">Oops! Something went wrong.</p>
      <p>Try refreshing the page.</p>
    </div>
  );
};

export default Error;
