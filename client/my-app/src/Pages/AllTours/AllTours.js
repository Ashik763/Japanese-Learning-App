import React, { useEffect, useState } from "react";
import TourInHome from "../Home/ServiceInHome/TourInHome";
import { Helmet } from "react-helmet";

const Title = "All Packages";
// https://myapp-beige-ten.vercel.app

const AllTours = () => {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    fetch("https://myapp-8k92brsir-ashik763.vercel.app/alltours")
      .then((res) => res.json())
      .then((data) => {
        setTours(data);
      });
  }, []);

  const handleSearch = () => {
    // event.preventDefault();

    // const form = event.target;

    // const name  = form.name.value;
    const name = document.getElementsByName("name")[0].value;

    if (name.length === 0) {
      fetch("https://myapp-8k92brsir-ashik763.vercel.app/alltours")
        .then((res) => res.json())
        .then((data) => {
          setTours(data);
        });
    } else {
      fetch(`https://myapp-8k92brsir-ashik763.vercel.app/searchQuery/${name}`)
        .then((res) => res.json())
        .then((data) => {
          setTours(data);
          //   (data);
        });
    }
  };

  return (
    <div className="mt-5 ">
      <Helmet>
        <title> {Title}</title>
      </Helmet>

      <div className="text-center">
        {/* <p className=' text-bold '>   </p> */}
        <p className="  text-[#FF6041] text-4xl mt-5 text-bold"> Packages </p>
      </div>
      <div className="flex justify-center mt-2">
        <form className="w-3/4">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={handleSearch}
              type="search"
              name="name"
              id="default-search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search destinations ...."
              required
            />
            {/* <button
           
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button> */}
          </div>
        </form>
      </div>

      <div className=" mt-5   flex flex-col md:flex-row flex-wrap  border md:justify-around    ">
        {tours.map((tour) => (
          <TourInHome key={tour._id} tour={tour}>
            {" "}
          </TourInHome>
        ))}
      </div>
    </div>
  );
};

export default AllTours;
