import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { addFeed } from "../../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { useState } from "react";
import Loading from "../utils/Loading";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);

  const [toast, setToast] = useState(null);

  if (user === null || user.length === 0) {
    navigate("/login");
  }

  const getFeed = async () => {
    if (feed && feed.length > 0) {
      return;
    }

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Fetch Error:", err);
      navigate("/home");
    }
  };

  useEffect(() => {
    if (feed === null || feed.length === 0) getFeed();
  }, []);

  return feed !== null && feed.length !== 0 ? (
    <div className="w-screen bg-base-100 my-auto relative h-screen md:pt-44 lg:pt-44 pt-28 mx-auto">
      {toast !== null ? (
        toast === "interested" ? (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <span>Request sent</span>
            </div>
          </div>
        ) : (
          <div className="toast toast-top toast-end">
            <div className="alert alert-info">
              <span>ignored</span>
            </div>
          </div>
        )
      ) : (
        <p></p>
      )}

      <UserCard user={feed[0]} setToast={setToast} />
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
