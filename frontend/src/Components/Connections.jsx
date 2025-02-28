import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();

  const [err, setErr] = useState("");
  const connections = useSelector((store) => store.connections);

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
    if (connections === null) fetchConnections();
  }, []);

  return connections !== null ? (
    <div className="w-screen h-screen flex flex-col gap-6 items-center p-6 bg-gradient-to-tl from-stone-100 to-stone-300 dark:from-stone-800 dark:to-stone-700">
      <h2 className="text-lg font-bold dark:text-white text-black">
        Connections
      </h2>
      {connections.map((connection, index) => {
        const { firstName, lastName, photoUrl, headline } = connection;
        return (
          <div
            key={index}
            className="bg-white dark:bg-stone-600 p-4 rounded-lg w-2/6 min-h-24 flex gap-2 justify-between items-center"
          >
            <img
              className="w-20 h-20 rounded-full border-2 border-white dark:border-black"
              src={photoUrl}
            />
            <div className="flex flex-col flex-1">
              <h2 className="text-black text-lg dark:text-white">
                {firstName} {lastName}
              </h2>
              <p className="text-gray-500 dark:text-gray-200">{headline}</p>
            </div>
            <button className="btn btn-outline btn-primary dark:text-blue-300">
              Message
            </button>
          </div>
        );
      })}
      <p>{err}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Connections;
