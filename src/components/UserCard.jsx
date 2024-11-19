const UserCard = ({user}) => {
    const{firstName,lastname,about,photoUrl} =user;
    console.log(firstName)
    return(
        <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img
            src={photoUrl}
            alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " "+lastname}</h2>
          <p>I{about}</p>   
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>

    )
   
};
export default UserCard;
