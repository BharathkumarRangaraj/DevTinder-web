import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import feedreducer from "./slices/feedSlice"

const store=configureStore({
    reducer:{
        user:userReducer,
        feed:feedreducer
    }
})
export default store;