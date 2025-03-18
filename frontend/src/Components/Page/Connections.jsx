import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();

  const [err, setErr] = useState("");
  const connections = useSelector((store) => store.connections);
  const requests = useSelector((store) => store.requests);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      setErr(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, [requests]);

  return connections !== null ? (
    <div className="w-screen bg-base-300 h-screen relative flex flex-col gap-6 items-center py-10 transition-all ease-in-out duration-300">
      <h2 className="text-3xl mt-14 z-10 font-poppins">Connections</h2>
      <div className="flex flex-col gap-4 w-5/6 md:w-1/2 lg:w-1/2">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, headline, about } =
            connection;
          return (
            <div
              key={_id}
              className="bg-base-100/50 cursor-pointer z-20 transition-all duration-500 ease-out hover:shadow-[0px_0px_3px_2px_#FFFFE0] p-4 rounded-lg min-h-24 flex gap-2 justify-between items-center border border-accent"
            >
              <img
                className="w-10 h-10 md:lg:w-20 md:lg:h-20 rounded-full border-2 border-base-content"
                src={photoUrl}
              />
              <div className="flex flex-col flex-1">
                <h2 className="text-xl font-merriweather">
                  {firstName} {lastName}
                </h2>
                <p className="text-gray-400 font-montserrat">{headline}</p>
                <p className="text-gray-500 font-montserrat hidden md:inline lg:inline">
                  {about}
                </p>
              </div>
              <Link to={`/chat/${_id}`}>
                <button className="btn dark:border-yellow-600 duration-300 ease-in text-lg font-instrument-sans m-auto hover:bg-accent-content/15 hover:text-base-content font-thin ">
                  Message
                </button>
              </Link>
            </div>
          );
        })}
      </div>
      <p>{err}</p>
    </div>
  ) : (
    <div className="w-screen h-screen  py-10">
      <p className="text-center mt-14">No connections found</p>
    </div>
  );
};

export default Connections;
