import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Provider } from "react-redux";
import store from "./utils/appStore";
import NavBar from "./components/NavBar";  // Keep NavBar here
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/feed";
import Connections from "./components/Connections";
import Requests from "./components/Request";

// Animation wrapper for each route
const AnimatedRouteWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -20 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <NavBar /> {/* Keep the NavBar only here */}
        <AnimatedRouteWrapper>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </AnimatedRouteWrapper>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
