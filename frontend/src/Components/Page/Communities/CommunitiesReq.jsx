/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";
import axios from "axios";
import ViewProfile from "../../Profile/ViewProfile";

const CommunitiesReq = ({ _id }) => {
  const [error, setError] = useState("");
  const [req, setReq] = useState();
  const [prof, setProf] = useState(false);
  const [user, setUser] = useState();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/community/requests/${_id}`, {
        withCredentials: true,
      });
      setReq(res?.data?.data);
      setError("");
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return !prof ? (
    <div className="flex flex-col overflow-y-scroll min-h-screen max-h-screen py-10 gap-2 md:gap-4 lg:gap-8 items-center px-4 box-border">
      {req &&
        req.map((request, index) => {
          return (
            <div
              onClick={() => {
                setProf(true);
                setUser(request.userId);
              }}
              key={index}
              className="card card-border card-sm cursor-pointer border-accent/80 border-sm bg-base-100 w-[100%] md:w-[60%] h-full"
            >
              <div className="card-body">
                <div className="flex gap-2 md:gap-4">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={request.userId.photoUrl}
                  />
                  <div className="flex flex-col gap-1 ">
                    <h2 className="card-title md:font-semibold text-accent-content text-sm lg:text-xl md:text-xl">
                      {request.userId.firstName + " "}
                      <span>
                        {request.userId.lastName !== undefined
                          ? request.userId.lastName
                          : ""}
                      </span>
                    </h2>
                    <p>
                      Role applied:{" "}
                      <span className="md:font-semibold text-accent-content md:text-lg">
                        {request.role}
                      </span>
                    </p>
                    <p>
                      Message:{" "}
                      <span className="md:font-semibold text-accent-content md:text-lg">
                        {request.message}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-xs md:btn-sm lg:btn-md btn-dash border-md">
                    Accept
                  </button>
                  <button className="btn btn-xs md:btn-sm lg:btn-md btn-dash border-md">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      <p>{error}</p>
    </div>
  ) : (
    <div className="p-10">
      <ViewProfile user={user} />
    </div>
  );
};

export default CommunitiesReq;
