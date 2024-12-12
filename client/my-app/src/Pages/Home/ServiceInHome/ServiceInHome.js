import React, { useEffect, useState } from "react";
import TourInHome from "./TourInHome";
import { Link } from "react-router-dom";

const ServiceInHome = () => {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    fetch("https://myapp-8k92brsir-ashik763.vercel.app/homeTours")
      .then((res) => res.json())
      .then((data) => {
        setTours(data);
      });
  }, []);
  // const tours = [
  //     {
  //         _id:1,
  //         tour_name:"Hiking Mountain",
  //         description:"Eros cursus aptent sodales nunc metus sociosqu nam letius velit class mattis penatibus nascetur tempor",
  //         img:"https://img.freepik.com/free-photo/person-mountain-top_1160-904.jpg?w=996&t=st=1683575654~exp=1683576254~hmac=2fa978bfb225f177419596e241c187326281e340287100820e1f330985d17dd4"

  //     },
  //     {
  //         _id:2,
  //         tour_name:"Hiking Mountain",
  //         description:"Eros cursus aptent sodales nunc metus sociosqu nam letius velit class mattis penatibus nascetur tempor",
  //         img:"https://img.freepik.com/free-photo/person-mountain-top_1160-904.jpg?w=996&t=st=1683575654~exp=1683576254~hmac=2fa978bfb225f177419596e241c187326281e340287100820e1f330985d17dd4"

  //     },
  //     {
  //         _id:3,
  //         tour_name:"Hiking Mountain",
  //         description:"Eros cursus aptent sodales nunc metus sociosqu nam letius velit class mattis penatibus nascetur tempor",
  //         img:"https://img.freepik.com/free-photo/person-mountain-top_1160-904.jpg?w=996&t=st=1683575654~exp=1683576254~hmac=2fa978bfb225f177419596e241c187326281e340287100820e1f330985d17dd4"

  //     }

  // ]
  return (
    <div className="mt-5">
      <div className="text-center">
        <p className=" text-[#FF6041] text-bold "> FEATURED </p>
        <p className=" text-4xl mt-5 text-bold"> Popular Package Tour </p>
      </div>
      <div className=" mt-5  flex flex-col md:flex-row md:justify-around  ">
        {tours.map((tour) => (
          <TourInHome key={tour._id} tour={tour}>
            {" "}
          </TourInHome>
        ))}
      </div>

      <div className="text-center">
        {/* Link */}
        <Link className="btn btn-outline" to="/tours">
          SEE ALL{" "}
        </Link>
      </div>
    </div>
  );
};

export default ServiceInHome;
