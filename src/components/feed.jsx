import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/slices/feedSlice";
import { useEffect } from "react";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const getFeed = async () => {
    try {
      const res = await axios.get("http://localhost:7777/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data, "feeddd"));
    } catch (err) {
      throw new Error("feed is empty and something wrong");
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return <div>feed</div>;
};
export default Feed;
