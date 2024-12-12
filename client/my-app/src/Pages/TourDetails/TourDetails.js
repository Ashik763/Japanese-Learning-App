import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import ReviewsOnTour from "./ReviewsOnTour/ReviewsOnTour";
import AddReview from "./AddReview/AddReview";
import Spinner from "../Shared/Spinner/Spinner";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/AuthProvider";

const Title = "Tour Details";
const TourDetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [tour, setTour] = useState({});
  const [reviews, setReviews] = useState([]);
  const [instantReviews, setInstantReviews] = useState([]);
  const [users, setUsers] = useState(tour?.travellers || []);
  const { id } = useParams();
  useEffect(() => {
    ("clicked");
    fetch(`https://myapp-8k92brsir-ashik763.vercel.app/tourDetails/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTour(data);
        setUsers(data.travellers);
      });
  }, [id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [users]);

  // if(reviews.length-1 === instantReviews.length){
  //   ("instantReviews")
  //   setReviews(reviews);
  // }

  // useEffect(() => {
  //   const email = "ashikghosh.cse7.bu@gmail.com";
  //     fetch(`https://myapp-8k92brsir-ashik763.vercel.app/myReviews/${email}`)
  //     .then(response => response.json())
  //     .then(data => setReviews(data));
  // },[setReviews]);

  // if(tour){
  //   return <Spinner></Spinner>
  // }
  // useEffect(() =>{

  // },[]);
  // (tourPlace);

  const handleCancelTour = () => {
    // ("clicked");

    fetch(`https://myapp-8k92brsir-ashik763.vercel.app/cancelTour/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        email: user.email,
        name: user.displayName,
        UserImg: user.photoURL,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        toast("Tour Cancelled !✅");
        const updatedTravellers = users?.filter(
          (traveller) => traveller.email !== user.email
        );
        setUsers(updatedTravellers);
        // setTracker(!tracker);
      });
  };

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
            ...users,
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
    <div className="mt-5">
      <Helmet>
        <title> {Title} </title>
      </Helmet>
      <div className=" mt-5  flex flex-col md:flex-row md:justify-around  ">
        <div className=" border md:w-3/4 mb-5  ">
          <div className="card  bg-base-100 shadow-xl">
            <figure>
              <img src={tour.img} alt="images" />
            </figure>
            <div
              style={{ fontSize: "10px" }}
              className="w-full text-center mt-2 "
            >
              <b> Starting & Ending date:</b> {formatDate(tour.from)} <b>to </b>{" "}
              {formatDate(tour.to)}
            </div>
            <div className="card-body">
              <h2 className="card-title">{tour.tour_name}!</h2>
              <p className="text-sm font-extralight">{tour.description}</p>
            </div>
            {/* <button onClick={handleCancelTour} style={{width:"200px",position:"absolute",bottom:"2px",right:"2px"}} class=" bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Cancel tour
            </button> */}
            <div className=" w-full text-center">
              <img
                className="mx-auto"
                style={{
                  height: "30px",
                  width: "30px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                src={tour.UserImg}
              />
              <b className=" text-xs ">Added by: {tour.name} </b>
            </div>
            <div className="card-actions absolute bottom-2 right-2">
              {users
                ?.map((traveller) => traveller.email)
                .includes(user?.email) ? (
                <button
                  onClick={handleCancelTour}
                  style={{
                    width: "200px",
                    position: "absolute",
                    bottom: "2px",
                    right: "2px",
                  }}
                  class=" bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                >
                  Cancel tour
                </button>
              ) : (
                <button className="btn btn-outline" onClick={handleJoin}>
                  {" "}
                  Join
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ReviewsOnTour
        key={tour._id}
        id={tour._id}
        reviews={reviews}
        setReviews={setReviews}
      ></ReviewsOnTour>
      <AddReview
        id={tour._id}
        setTour={setTour}
        reviews={reviews}
        setReviews={setReviews}
        setInstantReviews={setInstantReviews}
      ></AddReview>
    </div>
  );
};

export default TourDetails;
