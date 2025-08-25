import axios from "axios";
import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { addRequests, removeRequest } from "../../utils/requestSlice";
import Loading from "../utils/Loading";
import CircleShimmer from "../utils/CircleShimmer";
const ViewProfile = lazy(() => import("../Profile/ViewProfile"));

const Requests = () => {
  const [err, setErr] = useState("");
  const [toast, setToast] = useState(null);
  const [flag, setFlag] = useState(true);
  const [viewProf, setViewProf] = useState(false);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
      if (res?.data?.message === "Connection Request") {
        setToast(status);
        setTimeout(() => {
          setToast(null);
        }, 3000);
      }
    } catch (err) {
      setErr(err);
    }
  };

  const fetchRequests = async () => {
    try {
      setFlag(true);
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(addRequests(res?.data?.data));
      setFlag(false);
    } catch (err) {
      setErr(err);
      navigate("/home");
    }
  };

  useEffect(() => {
    if (requests === null) fetchRequests();
  }, []);

  if (flag) {
    setTimeout(() => {
      setFlag(false);
    }, 5000);
    return <Loading />;
  }

  return requests !== null && requests.length !== 0 ? (
    !viewProf ? (
      <div className="w-screen pt-24 h-full bg-gradient-to-t to-base-300 from-base-accent relative flex flex-col gap-6 items-center py-10 transition-all ease-in-out duration-300">
        {toast != null ? (
          toast === "accepted" ? (
            <div className="z-60 toast toast-top toast-end">
              <div className="alert alert-success">
                <span className="text-white">Request accepted</span>
              </div>
            </div>
          ) : (
            <div className="z-60 toast toast-top toast-end">
              <div className="alert alert-info">
                <span className="text-white">Request rejected</span>
              </div>
            </div>
          )
        ) : (
          <p className="hidden"></p>
        )}
        <div className="w-[90%] border-sm md:w-1/2 lg:w-1/2 mx-auto border border-accent-content/30 min-h-screen max-h-fit px-2 pb-10 md:px-10">
          <h1 className="font-merriweather py-6 text-3xl z-20 text-center font-semibold">
            Requests
          </h1>
          <div className="flex flex-col gap-4">
            {requests.map((request, index) => {
              const { firstName, lastName, photoUrl, about, headline } =
                request.fromUserId;
              return (
                <div
                  onClick={() => {
                    setViewProf(true);
                    setUser(request.fromUserId);
                  }}
                  key={index}
                  className="cursor-pointer bg-base-200/50 z-20 border-2 border-accent-content/40 p-4 rounded-lg min-h-24 flex gap-2 justify-between items-center hover:shadow-lg hover:shadow-accent duration-500 ease-out"
                >
                  <img
                    className="w-12 h-12 aspect-square md:w-20 md:h-20 lg:w-20 lg:h-20 rounded-full border-2 border-base-content object-cover"
                    src={photoUrl}
                    alt="User profile photo"
                    loading="lazy"
                  />

                  <div className="flex flex-col flex-1">
                    <h2 className="text-base md:text-xl lg:text-xl font-merriweather">
                      {firstName} {lastName}
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base font-montserrat">
                      {headline}
                    </p>
                    <p className="text-gray-400 font-montserrat hidden md:inline lg:inline">
                      {about}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row lg:flex-row gap-2">
                    <button
                      onClick={() => reviewRequest("rejected", request._id)}
                      className="btn md:btn-md lg:btn-lg btn-sm dark:border-yellow-600 duration-300 ease-in text-lg font-instrument-sans m-auto hover:bg-accent-content/15 hover:text-base-content font-thin"
                    >
                      Ignore
                    </button>
                    <button
                      onClick={() => reviewRequest("accepted", request._id)}
                      className="btn md:btn-md lg:btn-lg btn-sm dark:border-yellow-600 duration-300 ease-in text-lg font-instrument-sans m-auto hover:bg-accent-content/15 hover:text-base-content font-thin"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ) : (
      <div className="w-screen h-full pt-28 bg-base-300 flex md:flex-row lg:flex-row flex-col justify-around lg:justify-center md:justify-center px-2 md:px-4 lg:px-6 lg:gap-8 md:gap-6 gap-4 py-8 mx-auto">
        <ViewProfile user={user} />
      </div>
    )
  ) : err !== "" ? (
    <p>{err}</p>
  ) : (
    <div className="w-screen bg-base-300 relative z-10 min-h-screen py-[25%]">
      {toast != null ? (
        toast === "accepted" ? (
          <div className="z-60 toast toast-top toast-end">
            <div className="alert alert-success">
              <span className="text-white">Request accepted</span>
            </div>
          </div>
        ) : (
          <div className="z-60 toast toast-top toast-end">
            <div className="alert alert-info">
              <span className="text-white">Request rejected</span>
            </div>
          </div>
        )
      ) : (
        <CircleShimmer />
      )}
      <p className="text-center font-merriweather">No requests found!!</p>
    </div>
  );
};

export default Requests;
