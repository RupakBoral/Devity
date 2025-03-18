import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { addRequests, removeRequest } from "../../utils/requestSlice";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const [err, setErr] = useState("");
  const [toast, setToast] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      setErr(err);
      navigate("/home");
    }
  };

  const requests = useSelector((store) => store.requests);

  useEffect(() => {
    if (requests === null) fetchRequests();
  }, []);

  return requests !== null && requests.length !== 0 ? (
    <div className="w-screen h-screen bg-base-300 relative flex flex-col gap-6 items-center py-5 transition-all ease-in-out duration-300">
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

      <h1 className="font-merriweather mt-14 text-3xl z-20 text-center">
        Requests
      </h1>
      <div className="flex flex-col gap-4 w-4/5 md:w-1/2 lg:w-1/2 ">
        {requests.map((request, index) => {
          const { firstName, lastName, photoUrl, about, headline } =
            request.fromUserId;
          return (
            <div
              key={index}
              className="cursor-pointer bg-base-100/50 z-20 border-2 border-accent/70 p-4 rounded-lg min-h-24 flex gap-2 justify-between items-center hover:dark:shadow-[0px_0px_3px_2px_#FFFFE0] duration-500 ease-out"
            >
              <img
                className="w-20 h-20 rounded-full border-2 border-base-content"
                src={photoUrl}
              />
              <div className="flex flex-col flex-1">
                <h2 className="text-xl font-merriweather">
                  {firstName} {lastName}
                </h2>
                <p className="text-gray-500 font-montserrat">{headline}</p>
                <p className="text-gray-400 font-montserrat hidden md:inline lg:inline">
                  {about}
                </p>
              </div>

              <div className="flex flex-col md:flex-row lg:flex-row gap-2">
                <button
                  onClick={() => reviewRequest("rejected", request._id)}
                  className="btn dark:border-yellow-600 duration-300 ease-in text-lg font-instrument-sans m-auto hover:bg-info-content hover:text-base-content font-thin "
                >
                  Ignore
                </button>
                <button
                  onClick={() => reviewRequest("accepted", request._id)}
                  className="btn dark:border-yellow-600 duration-300 ease-in text-lg font-instrument-sans m-auto hover:bg-info-content hover:text-base-content font-thin "
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : err !== "" ? (
    <p>{err}</p>
  ) : (
    <div className="w-screen bg-base-300 relative z-10 h-screen py-10">
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
      <p className="text-center mt-14 font-merriweather">No requests found!!</p>
    </div>
  );
};

export default Requests;
