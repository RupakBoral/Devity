import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { useState } from "react";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);

  const [toast, setToast] = useState(null);

  const getFeed = async () => {
    if (feed && feed.length > 0) {
      return;
    }

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
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
    <div className="w-full relative h-screen flex items-center justify-center mx-auto my-auto py-20 bg-gradient-to-tl from-stone-100 to-stone-300 dark:backdrop-brightness-90 dark:from-black dark:to-black">
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
    <div className="w-full h-screen mx-auto py-6 bg-gradient-to-tl from-stone-100 to-stone-300 dark:from-stone-800 dark:to-stone-700">
      <p className="text-lg text-center dark:text-white text-black">
        No users found !!
      </p>
    </div>
  );
};

export default Feed;
