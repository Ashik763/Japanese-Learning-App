import React from 'react';

const ReviewOnTour = ({review}) => {
    return (
        <div className='text-center border'>
             <figure className="flex flex-col  items-center justify-center p-8 text-center bg-white  border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700">
          <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            {/* <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {review.name}
            </h3> */}
            <p className="my-4">
              { review.description }
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center space-x-3">
            <img
             alt=""
              className="rounded-full w-9 h-9"
              src={review.img}
             
            ></img>
            <div className="space-y-0.5 font-medium dark:text-white text-left">
              {/* <div>{review.name}</div> */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {review.name}
              </div>
            </div>
          </figcaption>
        </figure>
        </div>
    );
};

export default ReviewOnTour;