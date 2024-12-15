import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/slices/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

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
   if (!feed) return;
   if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;
  return feed && (
    <div className="flex justify-center m-5">
      <UserCard user={feed[0]}/>
    </div>
  );
};
export default Feed;
