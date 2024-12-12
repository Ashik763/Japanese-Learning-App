import React, { useContext } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { Link } from "react-router-dom";

const AddReview = ({ id, setReviews, reviews }) => {
  const { user } = useContext(AuthContext);
  // const reviewObject;

  const confimation = (r) => {
    toast("Review added ! thanks🎉");

    setReviews([...reviews, r]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      const reviewText = e.target.review.value;

      fetch("https://myapp-8k92brsir-ashik763.vercel.app/addReview", {
        method: "POST",
        body: JSON.stringify({
          description: reviewText,
          tour_id: id,
          email: user.email,
          name: user.displayName,
          img: user.photoURL,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          confimation({
            description: reviewText,
            tour_id: id,
            email: user.email,
            name: user.displayName,
            img: user.photoURL,
          });
          e.target.reset();
        })
        .catch((err) => {
          toast("Something went wrong😥");
        });
    } else {
      alert(`Please login first `);
    }

    // (reviewText);
  };
  return (
    <div>
      <form className="text-center" onSubmit={handleSubmit}>
        <div className="text-center">
          <label>
            <p className="mb-5">We would love to see your feedback!</p>

            <textarea name="review" className="border-2 md:w-1/2 w-3/4 h-40 " />
          </label>
        </div>

        <input className="btn btn-outline m-4" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddReview;
