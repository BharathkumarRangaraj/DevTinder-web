import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./navBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../utils/slices/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userdata = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userdata) return;
    try {
      const res = await axios.get("http://localhost:7777/profile/view", {
        withCredentials: true,
      });
      dispatch(adduser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Body;
