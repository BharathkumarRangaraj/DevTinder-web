import { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/const";
import { useDispatch } from "react-redux";
import { adduser } from "../utils/slices/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastname, setlastname] = useState(user.lastname);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);
  const [age, setage] = useState(user.age);
  const [gender, setgender] = useState(user.gender);
  const [about, setabout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "profile/edit",
        {
          firstName,
          lastname,
          photoUrl,
          about,
          age,
          gender,
        },
        { withCredentials: true }
      );
      dispatch(adduser(res?.data?.data));
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="flex justify-center my-10 mxy-10">
      <div className="flex justify-center mx-10">
        <div className="card-body item-center">
          <h2 className="card-title justify-center">EditProfile</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">first Name :</span>
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Lastname :</span>
              </div>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">PhotoUrl :</span>
              </div>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setphotoUrl(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">about :</span>
                </div>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setabout(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Age:</span>
              </div>
              <input
                type="text"
                value={age}
                onChange={(e) => setage(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">gender :</span>
              </div>
              <input
                type="text"
                value={gender}
                onChange={(e) => setgender(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>

          <p className="text-red-300"></p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={() => saveProfile()}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <div>
        <UserCard
          user={{ firstName, lastname, photoUrl, age, gender, about }}
        />
      </div>
    </div>
  );
};
export default EditProfile;
