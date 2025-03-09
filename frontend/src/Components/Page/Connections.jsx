import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();

  const [err, setErr] = useState("");
  const connections = useSelector((store) => store.connections);
  const requests = useSelector((store) => store.requests);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
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
    <div className="w-screen h-full relative flex flex-col gap-6 items-center py-10 transition-all ease-in-out duration-300">
      <h2 className="text-3xl z-10 font-poppins">Connections</h2>
      <div className="flex flex-col gap-4 w-4/5 md:w-1/2 lg:w-1/2">
        {connections.map((connection, index) => {
          const { firstName, lastName, photoUrl, headline, about } = connection;
          return (
            <div
              key={index}
              className="bg-base-200/60 cursor-pointer z-20 transition-all duration-500 ease-out hover:shadow-[0px_0px_3px_2px_#FFFFE0] p-4 rounded-lg min-h-24 flex gap-2 justify-between items-center border border-accent"
            >
              <img
                className="w-20 h-20 rounded-full border-2 border-base-content"
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
              <button className="btn dark:border-yellow-600 duration-300 ease-in text-lg font-instrument-sans m-auto hover:bg-info-content hover:text-base-content font-thin ">
                Message
              </button>
            </div>
          );
        })}
      </div>
      <p>{err}</p>
    </div>
  ) : (
    <div className="w-screen h-screen mt-10 py-10">
      <p className="text-center text-lg">No connections found</p>
    </div>
  );
};

export default Connections;
