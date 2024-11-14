import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adduser } from "../utils/slices/userSlice";

const Login = () => {
  const [email, setemail] = useState("Gokul@gmail.com");
  const [password, setpassword] = useState("Gokul@123");
  const naviage=useNavigate();
  const dispatch=useDispatch();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login/",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(adduser(res))
      naviage('/');
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-xl flex my-2 item-center ml-96">
      <div className="card-body item-center">
        <h2 className="card-title justify-center">Login</h2>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Enter you Email :</span>
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">password:</span>
            </div>
            <input
              type="text"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
