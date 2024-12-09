import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import feedreducer from "./slices/feedSlice";
import connectionReducer from "./slices/connectionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedreducer,
    connections: connectionReducer,
  },
});
export default store;
