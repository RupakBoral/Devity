import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import FeedLightBg from "../img/FeedLightBg.jpg";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed && feed.length > 0) {
      console.log("object");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(BASE_URL + "/feed", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.error("Fetch Error:", err);
      navigate("/home");
    }
  };

  useEffect(() => {
    if (!feed || feed.length === 0) {
      getFeed();
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${FeedLightBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex w-full inset-0 bg-gradient-to-tr from-red-100 to-[#ff99ac] items-center h-full"
    >
      {feed != null && <UserCard user={feed.data[2]} />}
    </div>
  );
};

export default Feed;
