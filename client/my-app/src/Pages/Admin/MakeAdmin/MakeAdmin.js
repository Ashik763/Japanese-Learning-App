import React from "react";
import { toast } from "react-toastify";

const MakeAdmin = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    fetch("https://myapp-8k92brsir-ashik763.vercel.app/addAdmin", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        // ('success', data);
        toast("Admin added successfully");
        e.target.reset();
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="m-5">
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-3/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Make Admin
        </button>
      </form>
    </div>
  );
};

export default MakeAdmin;
