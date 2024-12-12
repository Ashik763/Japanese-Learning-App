import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Shared/Spinner/Spinner";
import { Helmet } from "react-helmet";

// import { AuthContext } from "../../Contexts/AuthProvider";
const Title = "My Tours";
const MyTours = () => {
  const { user } = useContext(AuthContext);
  const [myTours, setMyTours] = useState([]);
  const [tracker, setTracker] = useState(false);
  const [loading, setLoading] = useState(true);

  //    const { data: specialties, isLoading } = useQuery ({
  //     queryKey: ['tours'],
  //     queryFn: async () => {
  //         const res = await  fetch(`https://myapp-8k92brsir-ashik763.vercel.app/myTours/${user.email}`) ;
  //         const data = await res.json();
  //         setMyTours(data);
  //         return data;
  //     }
  // })

  useEffect(() => {
    fetch(`https://myapp-8k92brsir-ashik763.vercel.app/myTours/${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        // (data);
        setLoading(false);
        setMyTours(data);
      });
  }, [tracker]);

  const handleDelete = (id) => {
    fetch(`https://myapp-8k92brsir-ashik763.vercel.app/deleteMyTour/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setTracker(!tracker);
        toast("Successfully Deleted");
      });
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div className=" overflow-hidden ">
      <Helmet>
        <title> {Title}</title>
      </Helmet>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden flex justify-center">
              <table class="w-3/4 text-center text-sm font-light  ">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" class="px-6 py-4">
                      Title
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Description
                    </th>
                    <th scope="col" class="px-6 py-4">
                      status
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {myTours?.map((myTour) => (
                    <tr class="border-b dark:border-neutral-500">
                      <td class="whitespace-nowrap px-6 py-4 font-medium">
                        {myTour.tour_name}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        {myTour.description.substring(0, 20)}...
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        {myTour.pending ? (
                          <span className=" text-warning "> Pending </span>
                        ) : myTour.approved ? (
                          <span className=" text-success "> Approved </span>
                        ) : (
                          <span className=" text-red-600 "> Declined </span>
                        )}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 flex justify-center ">
                        <button onClick={() => handleDelete(myTour._id)}>
                          {" "}
                          <AiOutlineDelete></AiOutlineDelete>{" "}
                        </button>{" "}
                      </td>
                      {/* <td></td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTours;
