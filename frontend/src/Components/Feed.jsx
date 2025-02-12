import { useSelector } from "react-redux";

const Feed = () => {
  const userData = useSelector((store) => store.user);
  if (userData == null) return;
  return <div>feed</div>;
};

export default Feed;
