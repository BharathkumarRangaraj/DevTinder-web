import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adduser } from "../utils/slices/userSlice";
import { BASE_URL } from "../utils/const";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error,seterror]=useState("")
  const naviage=useNavigate();
  const dispatch=useDispatch();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL+"login/",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(adduser(res.data))
      naviage('/');
    } catch (err) {
      seterror(err?.response?.data || "something went wrong");
     
      
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "signup",
        { firstName, lastname, email, password },
        { withCredentials: true }
      );
      dispatch(adduser(res.data.data));
      return naviage("/profile");
    } catch (err) {
      seterror(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-xl flex my-2 item-center ml-96">
      <div className="card-body item-center">
      <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastname}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
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
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>
<p className="text-red-300">{error}</p>
        <div className="card-actions justify-center">
        <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
          </button>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};
export default Login;
