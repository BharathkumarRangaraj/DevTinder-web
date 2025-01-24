import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/slices/connectionSlice";
import { BASE_URL } from "../utils/const";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <p className="text-center text-white">Loading...</p>;

  if (connections.length === 0) {
    return (
      <div className="flex justify-center items-center my-10">
        <h2 className="text-2xl text-gray-400">No Connections Found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5 bg-gradient-to-r rounded-lg">
      <h1 className="text-center text-3xl font-extrabold text-white mb-6">
        Your Connections
      </h1>

      {/* Connections list */}
      <div className="flex flex-wrap justify-center gap-6">
        {connections.map((connection) => {
          const { _id, firstName, lastname, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all w-full sm:w-1/2 md:w-1/3 xl:w-1/4"
            >
              <div className="flex items-center mb-4">
                <img
                  src={photoUrl}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />
                <div className="ml-4">
                  <h2 className="font-semibold text-2xl text-gray-800 hover:text-indigo-500 transition-colors">
                    {firstName + " " + lastname}
                  </h2>
                  {age && gender && (
                    <p className="text-gray-500 text-sm">{`${age}, ${gender}`}</p>
                  )}
                </div>
              </div>
              <p className="text-gray-700 mt-2">{about}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
