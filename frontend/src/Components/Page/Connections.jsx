import axios from "axios";
import { lazy, useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../utils/connectionSlice";
import { Link } from "react-router-dom";
import Loading from "../utils/Loading";
const ViewProfile = lazy(() => import("../Profile/ViewProfile"));

const Connections = () => {
  const dispatch = useDispatch();

  const [err, setErr] = useState("");
  const connections = useSelector((store) => store.connections);
  const [flag, setFlag] = useState(false);
  const [viewProf, setViewProf] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (
      connections === null ||
      connections === undefined ||
      connections.length === 0
    )
      fetchConnections();
  }, []);

  if (flag) {
    return <Loading />;
  }

  const fetchConnections = async () => {
    try {
      setFlag(true);
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
    setFlag(false);
  };

  return connections !== null ? (
    !viewProf ? (
      <main className="w-screen bg-gradient-to-t to-base-300 from-base-accent min-h-screen relative flex flex-col gap-6 items-center pt-24 py-10 transition-all ease-in-out duration-300">
        <section className="w-[90%] rounded-sm border-sm md:w-1/2 lg:w-1/2 mx-auto border border-accent-content/30 min-h-screen max-h-fit px-2 pb-10 md:px-10">
          <h2 className="text-3xl py-6 md:text-3xl z-10 font-merriweather font-light text-center">
            Connections
          </h2>
          <section className="flex flex-col gap-4 text-base">
            {connections.map((connection) => {
              const { _id, firstName, lastName, photoUrl, headline, about } =
                connection;
              return (
                <div
                  onClick={() => {
                    setViewProf(true);
                    setUser(connection);
                  }}
                  key={_id}
                  className="bg-base-200/50 cursor-pointer z-20 transition-all duration-500 ease-out hover:shadow-lg hover:shadow-accent p-4 rounded-lg min-h-24 flex gap-2 justify-between items-center border border-accent-content/40"
                >
                  <img
                    className="w-12 h-12 md:w-20 md:h-20 lg:w-20 lg:h-20 rounded-full border-2 border-base-content object-cover"
                    src={photoUrl}
                    alt="User profile photo"
                    loading="lazy"
                  />

                  <div className="flex flex-col flex-1">
                    <h2 className="md:text-xl text-base font-merriweather">
                      {firstName} {lastName}
                    </h2>
                    <p className="text-gray-400 font-montserrat md:text-base text-sm">
                      {headline}
                    </p>
                    <p className="text-gray-500 font-montserrat hidden md:inline lg:inline">
                      {about}
                    </p>
                  </div>
                  <Link to={`/chat/${_id}`}>
                    <button className="btn btn-sm md:btn-md lg:btn-lg dark:border-yellow-600 duration-300 ease-in text-base md:text-lg font-instrument-sans m-auto hover:bg-accent-content/15 hover:text-base-content font-thin ">
                      Message
                    </button>
                  </Link>
                </div>
              );
            })}
          </section>
        </section>
      </main>
    ) : (
      <div className="w-screen h-full pt-28 bg-base-300 flex md:flex-row lg:flex-row flex-col justify-around lg:justify-center md:justify-center px-2 md:px-4 lg:px-6 lg:gap-8 md:gap-6 gap-4 py-8 mx-auto">
        <ViewProfile user={user} />
      </div>
    )
  ) : (
    <div className="w-screen h-screen py-[25%]">
      <p className="text-center">No connections found</p>
      <p>{err}</p>
    </div>
  );
};

export default Connections;
