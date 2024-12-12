import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeclinedTours = () => {
  const [pendingTours, setPendingTours] = useState([]);
  // const {refetch} = useQuery();
  const [tracker, setTracker] = useState(false);
  const handleApprove = (pendingTour) => {
    fetch(
      `https://myapp-8k92brsir-ashik763.vercel.app/approveTour/${pendingTour._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({}),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        // (json)
        // refetch();
        toast("Tours approved!🤩");
        setTracker(!tracker);
      });
  };

  //   const handleDecline = (pendingTour) => {

  //     fetch(`https://myapp-8k92brsir-ashik763.vercel.app/declineTour/${pendingTour._id}`, {
  //       method: "PATCH",
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //       },
  //       body:JSON.stringify({

  //       })
  //     })
  //     .then((response) => response.json())
  //     .then((json) => {
  //         (json)
  //         // refetch();
  //         toast("Tours declined! ✅");
  //         setTracker(!tracker);
  //     });

  //   };

  useEffect(() => {
    fetch("https://myapp-8k92brsir-ashik763.vercel.app/allDeclinedTours")
      .then((res) => res.json())
      .then((data) => {
        setPendingTours(data);
        // (data);
      });
  }, [tracker]);
  return (
    <div>
      <div className=" mt-5  flex flex-wrap flex-col md:flex-row justify-around content-center  ">
        {pendingTours.map((pendingTour) => (
          <div
            style={{ minWidth: "300px" }}
            className=" hover:shadow-lg dark:hover:shadow-black/30 w-5/12  md:w-5/12 m-3   "
          >
            <div className="card  bg-base-100 shadow-xl">
              <PhotoProvider>
                <figure className="border w-full p-3">
                  <PhotoView src={pendingTour.img}>
                    <img
                      className="w-full h-[16rem] object-cover "
                      src={pendingTour.img}
                      alt="img"
                    />
                  </PhotoView>
                </figure>
              </PhotoProvider>

              <div className="card-body h-[10rem]">
                <p className="font-bold">
                  {pendingTour.tour_name.substring(0, 27)}...
                </p>
                <p className="text-xs font-thin">
                  {pendingTour.description.substring(0, 2)}...
                </p>
                <div className="card-actions   ">
                  <div className="text-xs font-thin flex flex-row justify-around border w-full ">
                    <div>
                      <button
                        onClick={() => handleApprove(pendingTour)}
                        className="btn btn-outline btn-success"
                      >
                        Approve
                      </button>
                    </div>
                    {/* <div> 
                                        <button onClick={()=> handleDecline(pendingTour)  } className="btn btn-outline btn-error "> Decline </button>
                                        </div> */}
                    <div>
                      <Link
                        className="btn btn-outline btn-warning"
                        to={`/pendingTourDetails/${pendingTour._id}`}
                      >
                        Details{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeclinedTours;
