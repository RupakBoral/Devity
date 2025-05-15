/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";

const CommunityMembers = ({ _id }) => {
  const [members, setMembers] = useState(null);
  const [error, setError] = useState("");

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/community/${_id}/members`, {
        withCredentials: true,
      });
      setMembers(res?.data?.data);
      setError("");
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="flex flex-col overflow-y-scroll min-h-screen max-h-screen py-10 gap-2 md:gap-4 lg:gap-8 items-center px-4 box-border">
      {members !== null && members.length !== 0 ? (
        members.map((member, index) => {
          return (
            <div
              key={index}
              className="card card-border card-sm cursor-pointer border-accent/80 border-sm bg-base-100 w-[100%] md:w-[60%] h-full"
            >
              <div className="card-body">
                <div className="flex gap-2 md:gap-4">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={member.userId.photoUrl}
                  />
                  <div className="flex flex-col gap-1 ">
                    <h2 className="card-title md:font-semibold text-accent-content text-sm lg:text-xl md:text-xl">
                      {member.userId.firstName + " "}
                      <span>
                        {member.userId.lastName !== undefined
                          ? member.userId.lastName
                          : ""}
                      </span>
                    </h2>
                    <p>
                      Role applied:{" "}
                      <span className="md:font-semibold text-accent-content md:text-lg">
                        {member.role}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No Members found</p>
      )}
      <p>{error}</p>
    </div>
  );
};

export default CommunityMembers;
