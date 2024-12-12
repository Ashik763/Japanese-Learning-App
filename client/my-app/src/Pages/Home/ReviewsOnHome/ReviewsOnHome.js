import React, { useEffect, useState } from "react";
import ReviewOnHome from "./ReviewOnHome";
import { Link } from "react-router-dom";

const ReviewsOnHome = () => {
  const [homeReviews, setHomeReviews] = useState([]);
  useEffect(() => {
    fetch("https://myapp-8k92brsir-ashik763.vercel.app/homeReviews")
      .then((res) => res.json())
      .then((data) => {
        setHomeReviews(data);
        // (data);
      });
  }, []);
  return (
    <div>
      <div className="mt-5">
        <div className="text-center">
          <p className=" text-[#FF6041] text-bold text-xl "> Reviews </p>
        </div>
        <div className=" mt-5  flex flex-col md:flex-row md:justify-around  ">
          {homeReviews.map((review) => (
            <ReviewOnHome key={review._id} review={review}>
              {" "}
            </ReviewOnHome>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsOnHome;
