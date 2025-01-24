import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/slices/feedSlice";
import { BASE_URL } from "../utils/const";
import axios from "axios";

const UserCard = ({ user }) => {
  const { _id, firstName, lastname, photoUrl, about, age, gender } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Error handling request:", err);
    }
  };

  return (
    <div className="card bg-black w-96 h-[450px] shadow-xl flex flex-col justify-between p-4 mx-auto rounded-lg">
      {/* Image Section */}
      <figure className="mb-4">
        <img
          src={photoUrl}
          alt="Profile"
          className="w-full h-full object-contain rounded-lg"
        />
      </figure>

      {/* Card Content */}
      <div className="card-body flex flex-col justify-between h-full text-white">
        <div>
          <h2 className="card-title text-xl font-bold">
            {firstName + " " + lastname}
          </h2>
          {age && gender && (
            <p className="text-gray-400 text-sm">{age + ", " + gender}</p>
          )}
          <p className="text-gray-300 text-sm mt-2">{about}</p>
        </div>

        {/* Action Buttons */}
        <div className="card-actions justify-center mt-4 space-x-4">
          <button
            className="btn btn-primary w-32"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary w-32"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
