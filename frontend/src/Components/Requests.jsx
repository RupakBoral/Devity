import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const [err, setErr] = useState("");
  const [toast, setToast] = useState(null);

  const dispatch = useDispatch();

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
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      setErr(err);
    }
  };

  const requests = useSelector((store) => store.requests);

  useEffect(() => {
    if (requests === null) fetchRequests();
  }, []);

  return requests !== null && requests.length !== 0 ? (
    <div className="w-screen relative z-10 h-screen bg-gradient-to-tl from-stone-100 to-stone-300 dark:to-black dark:from-stone-950 py-10">
      {toast != null ? (
        toast === "accepted" ? (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <span className="text-white">Request accepted</span>
            </div>
          </div>
        ) : (
          <div className="toast toast-top toast-end">
            <div className="alert alert-info">
              <span className="text-white">Request rejected</span>
            </div>
          </div>
        )
      ) : (
        <p></p>
      )}
      <div className="w-72 h-72 rounded-full bg-stone-500 absolute blur-3xl top-[30%] right-[43%]"></div>
      <h1 className="font-merriweather text-3xl font-bold z-20 text-center my-5 text-black dark:text-stone-300">
        Requests
      </h1>
      {requests.map((request, index) => {
        const { firstName, lastName, photoUrl, about, headline } =
          request.fromUserId;
        return (
          <div
            key={index}
            className="w-1/2 bg-stone-200 z-20 dark:bg-transparent border backdrop-blur-lg border-stone-300 p-4 rounded-lg min-h-24 flex gap-2 justify-between items-center mx-auto my-10 hover:dark:shadow-[0px_0px_8px_2px_#FFFFE0] duration-700 ease-in"
          >
            <img
              className="w-20 h-20 rounded-full border-2 border-white dark:border-black"
              src={photoUrl}
            />
            <div className="flex flex-col flex-1">
              <h2 className="text-black dark:text-white text-xl font-merriweather">
                {firstName} {lastName}
              </h2>
              <p className="text-gray-500 dark:text-gray-300 font-montserrat">
                {headline}
              </p>
              <p className="text-gray-500 dark:text-gray-200 font-poppins">
                {about}
              </p>
            </div>
            <button
              onClick={() => reviewRequest("rejected", request._id)}
              className="btn btn-outline duration-700 ease-in hover:bg-stone-700 dark:border text-lg dark:border-yellow-500 text-white font-montserrat font-thin dark:text-white"
            >
              Ignore
            </button>
            <button
              onClick={() => reviewRequest("accepted", request._id)}
              className="btn btn-outline duration-700 ease-in hover:bg-stone-700 font-montserrat text-lg dark:border-yellow-500 font-thin dark:text-white"
            >
              Accept
            </button>
          </div>
        );
      })}
    </div>
  ) : err !== "" ? (
    <p>{err}</p>
  ) : (
    <div className="w-screen relative z-10 h-screen bg-gradient-to-tl from-stone-100 to-stone-300 dark:to-stone-900 dark:from-stone-950 py-10">
      {toast != null ? (
        toast === "accepted" ? (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <span className="text-white">Request accepted</span>
            </div>
          </div>
        ) : (
          <div className="toast toast-top toast-end">
            <div className="alert alert-info">
              <span className="text-white">Request rejected</span>
            </div>
          </div>
        )
      ) : (
        <p></p>
      )}
      <p className="text-center text-4xl text-gray-700 dark:text-gray-300 font-merriweather">
        No requests found!!
      </p>
    </div>
  );
};

export default Requests;
