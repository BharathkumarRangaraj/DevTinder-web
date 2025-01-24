import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adduser } from "../utils/slices/userSlice";
import { BASE_URL } from "../utils/const";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "login/",
        { email, password },
        { withCredentials: true }
      );
      dispatch(adduser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(adduser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-x flex items-center justify-center">
      <div className="card bg-white shadow-2xl w-96 p-6 rounded-lg transform transition-transform hover:scale-105">
        <div className="card-body text-center">
          <h2 className="card-title text-2xl font-bold text-gray-800 mb-4">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div className="space-y-4">
            {!isLoginForm && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm font-semibold">{error}</p>
            )}
          </div>
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary w-full py-2 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
            <p
              className="text-sm text-gray-600 mt-4 cursor-pointer hover:underline"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? "New User? Sign up here"
                : "Already have an account? Login here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
