import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

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
    <div className="w-screen h-screen relative flex flex-col gap-6 items-center py-10 bg-gradient-to-tl from-stone-100 to-stone-300 dark:to-black dark:from-stone-950">
      <div className="w-72 h-72 rounded-full bg-stone-500 absolute blur-3xl top-[30%] right-[43%]"></div>
      <h2 className="text-3xl z-10 dark:text-stone-300 font-merriweather font-bold text-black">
        Connections
      </h2>
      {connections.map((connection, index) => {
        const { firstName, lastName, photoUrl, headline } = connection;
        return (
          <div
            key={index}
            className="bg-white cursor-pointer z-10 dark:bg-transparent transition-all duration-700 ease-in hover:dark:shadow-[0px_0px_8px_2px_#FFFFE0] p-4 rounded-lg w-2/6 min-h-24 flex gap-2 justify-between items-center border border-stone-500"
          >
            <img
              className="w-20 h-20 rounded-full border-2 border-white dark:border-black"
              src={photoUrl}
            />
            <div className="flex flex-col flex-1">
              <h2 className="text-black text-3xl dark:text-white font-light font-merriweather">
                {firstName} {lastName}
              </h2>
              <p className="text-gray-500 dark:text-gray-300 font-montserrat">
                {headline}
              </p>
            </div>
            <button className="btn dark:border-yellow-200 dark:bg-stone-800 duration-700 ease-in dark:text-white text-lg font-instrument-sans m-auto dark:hover:bg-stone-600 font-thin dark:hover:text-yellow-400">
              Message
            </button>
          </div>
        );
      })}
      <p>{err}</p>
    </div>
  ) : (
    <div className="w-screen h-screen py-10 bg-gradient-to-tl from-stone-100 to-stone-300 dark:from-stone-800 dark:to-stone-700">
      <p className="text-center text-lg font-semibold">No connections found</p>
    </div>
  );
};

export default Connections;
