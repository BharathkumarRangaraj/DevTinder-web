import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/slices/feedSlice";
import { useEffect } from "react";
import UserCard from "./userCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log(feed,"feedsss");
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "feed", {
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
  return feed && (
    <div className="flex justify-center m-5">
      <UserCard user={feed[0]}/>
    </div>
  );
};
export default Feed;
