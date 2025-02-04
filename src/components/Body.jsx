import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
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
      const res = await axios.get(BASE_URL+"profile/view", {
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
      <Outlet />
      <Footer />
    </div>
  );
};
export default Body;
