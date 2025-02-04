import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adduser } from "../utils/slices/userSlice";
import { BASE_URL } from "../utils/const";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [showPassword, setShowPassword] = useState(false); // Added password visibility toggle
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      return setError("Please fill in all fields.");
    }
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "login/",
        { email, password },
        { withCredentials: true }
      );
      dispatch(adduser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to process your request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!firstName || !lastname || !email || !password) {
      return setError("Please fill in all fields.");
    }
    setIsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "signup",
        { firstName, lastname, email, password },
        { withCredentials: true }
      );
      dispatch(adduser(res.data.data));
      setError("");
      alert("Signup successful! Redirecting...");
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600"
    >
      <motion.div
        className="card bg-white shadow-xl w-96 p-6 rounded-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card-body">
          <h2 className="card-title text-center text-2xl font-bold text-gray-800">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={isLoginForm ? "login" : "signup"}
            transition={{ duration: 0.3 }}
          >
            {!isLoginForm && (
              <>
                <label className="form-control w-full my-2">
                  <span className="label-text">First Name</span>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full my-2">
                  <span className="label-text">Last Name</span>
                  <input
                    type="text"
                    value={lastname}
                    className="input input-bordered w-full"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
            <label className="form-control w-full my-2">
              <span className="label-text">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full my-2">
              <span className="label-text">Password</span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full pr-10"
                />
                <span
                  className="absolute right-2 top-2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </label>
            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
          </motion.div>
          <div className="card-actions flex flex-col items-center mt-4">
            <motion.button
              whileHover={!isLoading ? { scale: 1.1 } : {}}
              whileTap={!isLoading ? { scale: 0.9 } : {}}
              className={`btn btn-primary w-full ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={isLoginForm ? handleLogin : handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : isLoginForm ? "Login" : "Sign Up"}
            </motion.button>
            <p
              className="text-sm mt-4 cursor-pointer text-gray-600 hover:text-blue-500"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? "New User? Sign up here"
                : "Existing User? Login here"}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
