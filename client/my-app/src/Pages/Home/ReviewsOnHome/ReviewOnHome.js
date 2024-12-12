import React, { useEffect, useState } from 'react';

const ReviewOnHome = ({review}) => {
    const [tour, setTour] = useState({});

    useEffect(() => {
        fetch(`https://myapp-8k92brsir-ashik763.vercel.app/tourDetails/${review.tour_id}`)
          .then((res) => res.json())
          .then((data) => setTour(data));
      }, [review.tour_id]);
    return (
        <div className=" overflow-hidden bg-cover bg-no-repeat w-full border shadow-md relative md:w-1/2 m-2">
        {/* <AiOutlineDelete onClick={handleDelete} className = " cursor-pointer text-xl absolute top-0 right-0"></AiOutlineDelete> */}
       <section className="bg-white dark:bg-gray-900  ">
         <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
           <figure className="max-w-screen-md mx-auto">
             <svg
               className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
               viewBox="0 0 24 27"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                 fill="currentColor"
               />
             </svg>
             <blockquote>
               <p className="text-base font-medium text-gray-900 dark:text-white">
                 {review?.description}
               </p>
             </blockquote>
             <figcaption className="flex items-center justify-center mt-6 space-x-3">
               <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                 <div className="font-bold pr-3  text-gray-900 dark:text-white">
                   Place: {tour?.tour_name}
                 </div>
               </div>
             </figcaption>
             <figcaption className="flex items-center justify-center space-x-3 mt-5">
            <img
             alt=""
              className="rounded-full w-9 h-9 absolute bottom-5"
              src={review.img}
             
            ></img>
            <div className="space-y-0.5 font-medium dark:text-white text-left absolute bottom-0">
              {/* <div>{review.name}</div> */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {review.name}
              </div>
            </div>
          </figcaption>
           </figure>
         </div>
       </section>
     </div>
    );
};

export default ReviewOnHome;