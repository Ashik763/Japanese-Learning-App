import React, { useEffect, useState } from "react";
import { useLoaderData, useParams, Link } from "react-router-dom";

// import Spinner from "../Shared/Spinner/Spinner";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

const PendingTourDetails = () => {
  const Title = "Pending Tour Details";

  const [tour, setTour] = useState({});
  const [tracker, setTracker] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://myapp-8k92brsir-ashik763.vercel.app/tourDetails/${id}`)
      .then((response) => response.json())
      .then((data) => setTour(data));
  }, [tracker]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        // refetch();
        toast("Tours approved! 🎉");
        setTracker(!tracker);
      });
  };
  const handleDecline = (pendingTour) => {
    fetch(
      `https://myapp-8k92brsir-ashik763.vercel.app/declineTour/${pendingTour._id}`,
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
        // refetch();
        toast("Tours declined! ✅");
        setTracker(!tracker);
      });
  };
  return (
    <div className="mt-5  flex flex-col items-center ">
      <Helmet>
        <title> {Title} </title>
      </Helmet>
      <div className=" mt-5  flex flex-col md:flex-row md:justify-around  ">
        <div className="  md:w-3/4 mb-5  ">
          <div className="card  bg-base-100 ">
            <figure>
              <img src={tour.img} alt="images" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{tour.tour_name}!</h2>
              <p className="text-sm font-extralight">{tour.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="w-8/12  mx-auto p-5">
          <div className="card lg:card-side bg-base-100 ">
            <figure>
              <img
                style={{ width: "450px", height: "250px", objectFit: "cover" }}
                src={tour.img2}
                alt="Album"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">User Information: </h2>
              <figcaption className="flex items-center justify-center space-x-3">
                <img
                  alt=""
                  className="rounded-full w-9 h-9"
                  src={tour.UserImg}
                ></img>
              </figcaption>
              <div className="border"></div>
              <div>
                <b>Name:</b>
                {tour.name}{" "}
              </div>
              <div>
                <b>Email: </b> {tour.email}{" "}
              </div>
              {/* <p> <b>Phone: </b> 01728323232</p> */}
              {/* <p>Click the button to listen on Spotiwhy app.</p> */}
            </div>
          </div>
        </div>
        <div className="card-actions border-t-2 mt-5 ">
          <div className="text-xs font-thin flex flex-row justify-around border w-full ">
            <div>
              {tour.pending ? (
                <button
                  onClick={() => handleApprove(tour)}
                  className="btn btn-outline btn-success "
                >
                  Approve
                </button>
              ) : (
                <button
                  onClick={() => handleApprove(tour)}
                  className="btn btn-outline btn-success "
                  disabled
                >
                  Approved
                </button>
              )}
            </div>
            <div>
              {tour.declined ? (
                <button
                  onClick={() => handleDecline(tour)}
                  className="btn btn-outline btn-error "
                  disabled
                >
                  Decline
                </button>
              ) : (
                <button
                  onClick={() => handleDecline(tour)}
                  className="btn btn-outline btn-error "
                >
                  {" "}
                  Decline{" "}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingTourDetails;
