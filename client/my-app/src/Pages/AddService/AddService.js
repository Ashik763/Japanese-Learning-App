import React, { useContext } from "react";

import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/AuthProvider";

const Title = "Add Package";

const AddService = () => {
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  // (imageHostKey);
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const tour_name = form.tour_name.value;
    const uploadedImg = form[2].files[0];
    const uploadedImg2 = form[6].files[0];

    // const image = form.img.value;
    const price = form.price.value;
    const description = form.description.value;
    const from = form.from.value;
    const to = form.to.value;

    const formData = new FormData();
    formData.append("image", uploadedImg);

    // (formData.entries());
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          formData.append("image", uploadedImg2);
          fetch(url, {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((imgData2) => {
              // ("success!",imgData);
              // ("success2!",imgData2);
              const img = imgData.data.url;
              const img2 = imgData2.data.url;
              const tour_package = {
                tour_name,
                img,
                img2,
                price,
                description,
                pending: true,
                declined: false,
                approved: false,
                email: user.email,
                name: user.displayName,
                UserImg: user.photoURL,
                travellers: [],
                from,
                to,
              };
              // (tour_package);
              fetch("https://myapp-8k92brsir-ashik763.vercel.app/addService", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(tour_package),
              })
                .then((res) => res.json())
                .then((data) => {
                  // ('success', data);
                  toast(" Your request for a tour plan has been sent ");
                  e.target.reset();
                });
            });
        }
      });
  };
  return (
    <div className="flex justify-center">
      <Helmet>
        <title> {Title}</title>
      </Helmet>

      <div className="md:w-1/2 w-full   ">
        <p className="text-2xl"> Add a package:</p>
        <form onSubmit={handleSubmit} className="  w-full md:w-3/4 mt-5">
          <label className="block text-sm font-medium leading-6 text-gray-900 ">
            Tour Package Name:{" "}
          </label>
          <input
            type="text"
            name="tour_name"
            placeholder="Type here"
            className=" p-2 block w-full md:w-3/4 mb-8 mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <label
            htmlFor="about"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Tour Description:
          </label>

          <textarea
            id="about"
            name="description"
            rows="3"
            className=" p-2 block w-full mt-2 mb-3  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>

          <label className="block text-sm font-medium leading-6 text-gray-900 ">
            Upload image:{" "}
          </label>
          <input
            type="file"
            name="img"
            className="p-2 block w-full md:w-3/4 mb-8 mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />

          <label className="block text-sm font-medium leading-6 text-gray-900 ">
            Starting date:{" "}
          </label>

          <input
            type="date"
            name="from"
            placeholder=""
            className="p-2 block  mb-8 mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
          <label className="block text-sm font-medium leading-6 text-gray-900 ">
            Ending date:{" "}
          </label>

          <input
            type="date"
            name="to"
            placeholder=""
            className="p-2 block  mb-8 mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />

          <label className="block text-sm font-medium leading-6 text-gray-900 ">
            Estimated cost (taka):{" "}
          </label>

          <input
            type="text"
            name="price"
            placeholder=""
            className="p-2 block w-1/4 mb-8 mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
          <div class="border "></div>
          <label className="block font-medium leading-6 text-gray-900 text-center text-2xl my-5 ">
            For Verification:{" "}
          </label>

          <label className="block text-sm  font-medium leading-6 text-gray-900 ">
            Upload image of your NID card:{" "}
          </label>
          <input
            type="file"
            name="nid_img"
            placeholder="https://www.img..."
            className="p-2 block w-full md:w-3/4 mb-8 mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <div className="w-full flex justify-center">
            <input
              type="submit"
              value="Request to add your package"
              className="block  mb-8 mt-2 rounded-md border py-1.5 btn btn-outline"
            />
          </div>

          {/* <input type='submit' value='Add Service' */}
        </form>
      </div>
    </div>
  );
};

export default AddService;
