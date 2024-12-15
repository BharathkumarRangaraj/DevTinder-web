import axios from "axios";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
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
      console.log(res,'resss')
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
    }
  };
  console.log(connections[1],'connectionss')

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastname, photoUrl, age, gender, about } =
          connection;
        console.log(connection, "connectionss");

        return (
          <div
            key={_id}
            className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastname}
              </h2>

              <p>{about}</p>
            </div>
            {age && gender && <p>{age + ", " + gender}</p>}
          </div>
        );
      })}
    </div>
  );
};
export default Connections;