import { useState } from "react";

const EditProfile = () => {
  const [firstName, setfirstName] = useState("");
  const [lastname, setlastname] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  return (
    <div className="card bg-base-300 w-96 shadow-xl flex my-2 item-center ml-96">
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
              <span className="label-text">Name :</span>
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
          <button className="btn btn-primary">Save Profile</button>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;
