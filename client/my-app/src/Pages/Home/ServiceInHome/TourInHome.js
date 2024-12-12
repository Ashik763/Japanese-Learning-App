import React, { useContext, useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const TourInHome = ({ tour }) => {
  // const history = useHistory();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { travellers } = tour;
  const [users, setUsers] = useState(travellers);

  //   const { data: specialties, isLoading } = useQuery ({
  //     queryKey: ['travellers'],
  //     queryFn: async () => {
  //         const res = await fetch(`https://myapp-8k92brsir-ashik763.vercel.app/joinInTour/${tour._id}`);
  //         const data = await res.json();
  //         setUsers(data);
  //         return data;
  //     }
  // })

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const handleJoin = () => {
    //

    if (!user) {
      navigate("/login");
      // return <Navigate to="/login"  replace></Navigate>
      // return <Navigate to="/login" state={{from: location}} replace></Navigate>
    } else {
      fetch(
        `https://myapp-8k92brsir-ashik763.vercel.app/joinInTour/${tour._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.displayName,
            UserImg: user.photoURL,
          }),
        }
      )
        .then((response) => response.json())
        .then((json) => {
          // (json)
          // refetch();
          toast("You successfully joined! ✅");
          setUsers([
            ...travellers,
            {
              email: user.email,
              name: user.displayName,
              UserImg: user.photoURL,
            },
          ]);
          // setTracker(!tracker);
        });
    }
  };

  return (
    <div className=" relative md:w-3/12 m-3 hover:shadow-lg dark:hover:shadow-black/30   ">
      <div className="card  bg-base-100 shadow-xl">
        <PhotoProvider>
          <figure className="border w-full cursor-pointer ">
            <PhotoView src={tour.img}>
              <img
                className="w-full h-[16rem] object-cover "
                src={tour.img}
                alt="img"
              />
            </PhotoView>
          </figure>
        </PhotoProvider>
        <div style={{ fontSize: "10px" }} className="w-full text-center mt-2 ">
          <b> Starting & Ending date:</b> {formatDate(tour.from)} <b>to </b>{" "}
          {formatDate(tour.to)}
        </div>

        <div className="card-body h-[13rem]">
          <h2 className="card-title">{tour.tour_name.substring(0, 20)}..</h2>
          <p className=" md:text-xs">
            {tour?.description.length > 100
              ? tour?.description.substring(0, 80) + "..."
              : tour.description}
          </p>
          <div className="card-actions absolute bottom-2 right-2">
            {users
              ?.map((traveller) => traveller.email)
              .includes(user?.email) ? (
              <span
                style={{ fontSize: "10px" }}
                className="p-1 bg-slate-300   mt-4 "
              >
                You{" "}
                {travellers.length - 1 > 0
                  ? "and " +
                    (travellers.length - 1) +
                    " other(s) have joined ! "
                  : "are in !"}{" "}
              </span>
            ) : (
              <button className="btn btn-outline" onClick={handleJoin}>
                {" "}
                Join
              </button>
            )}
            <Link className="btn btn-outline" to={`/tour/${tour._id}`}>
              View Details
            </Link>
          </div>
        </div>
        {/* <div style={{fontSize:"10px"}} className="absolute bottom-2 left-2"> 
              {formatDate(tour.from)} <b>to </b>  {formatDate(tour.to)}
            </div> */}
      </div>
    </div>
  );
};

export default TourInHome;
