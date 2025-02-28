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
    <div className="w-screen h-screen bg-gradient-to-tl from-stone-100 to-stone-300 dark:from-stone-800 dark:to-stone-700 py-10">
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
      <div className="p-4 dark:bg-stone-700 bg-white w-2/5 mx-auto rounded-lg">
        <h1 className="text-xl font-bold text-center my-5 text-black dark:text-white">
          Requests
        </h1>
        {requests.map((request, index) => {
          const { firstName, lastName, photoUrl, about, headline } =
            request.fromUserId;
          return (
            <div
              key={index}
              className="bg-stone-200 dark:bg-stone-900 p-4 rounded-lg min-h-24 flex gap-2 justify-between items-center mx-auto my-10"
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
                <p className="text-gray-500 dark:text-gray-200">{about}</p>
              </div>
              <button
                onClick={() => reviewRequest("rejected", request._id)}
                className="btn btn-outline btn-primary dark:text-blue-300"
              >
                Ignore
              </button>
              <button
                onClick={() => reviewRequest("accepted", request._id)}
                className="btn btn-outline btn-primary dark:text-blue-300"
              >
                Accept
              </button>
            </div>
          );
        })}
      </div>
    </div>
  ) : err !== "" ? (
    <p>{err}</p>
  ) : (
    <div className="w-screen h-screen py-8 bg-gradient-to-tl from-stone-100 to-stone-300 dark:from-stone-800 dark:to-stone-700">
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
      <p className="text-center text-gray-700 dark:text-gray-300 text-xl">
        No requests found!!
      </p>
    </div>
  );
};

export default Requests;
