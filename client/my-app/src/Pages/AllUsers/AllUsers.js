import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import ReactModal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import EditLessonModal from "./EditLessonModal";
import Swal from "sweetalert2";
// import "./styles.css"; 


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid black",
  },
};






const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [lessonName, setLessonName] = useState("");
  const [lessonNumber, setLessonNumber] = useState("");
  const [lessonId, setLessonId] = useState("");

//   const [role, setRole] = useState("");

  const handleChange = (event,user) => {
    const value = event.target.value;
    console.log(user);
    Swal.fire({
        title: "Are you sure?",
        text: `Do you want to change your role to "${value}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: '<span style="color: black;">Yes, change it!</span>',
      cancelButtonText: '<span style="color: black;">No, keep it</span>',
      customClass: {
        confirmButton: "swal-confirm-btn",
        cancelButton: "swal-cancel-btn",
      },
      }).then((result) => {
        if (result.isConfirmed) {
         handleUpdate(user,value);
          
         
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            fetchLessons();
          Swal.fire("Cancelled", "Your role remains unchanged.", "info");
        }
      });
  };
    
  const handleUpdate = async(user,value) => {
  
    fetch(
      `http://localhost:5000/users/update/${user._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            role: value
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        toast("Successfully Updated");
        Swal.fire("Updated!", `Your role has been changed to "${value}".`, "success");
        setLoading(true);
        fetchLessons();
      });
  };


  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = () => {
    setLoading(true);
    fetch(`http://localhost:5000/users/all`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching lessons:", error);
        setLoading(false);
      });
  };

//   const handleDelete = (_id) => {
//     fetch(`http://localhost:5000/lessons/delete/${_id}`, {
//       method: "DELETE",
//     })
//       .then((res) => res.json())
//       .then(() => {
//         setLoading(true);
//         fetchLessons();
//         toast.success("Lesson successfully deleted");
//       })
//       .catch((error) => {
//         console.error("Error deleting lesson:", error);
//         toast.error("Failed to delete lesson");
//       });
//   };

  function afterOpenModal() {}



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border relative  w-full mx-auto my-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Lessons</h1>
      <table className=" absolute right-2 top-2 w-full md:w-4/5 border  bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b"> Name</th>
            <th className="py-2 px-4 border-b"> Email</th>
            <th className="py-2 px-4 border-b"> Role </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b text-center">{user.name}</td>
              <td className="py-2 px-4 border-b text-center">{user.email}</td>
              <td className="py-2 px-4 border-b text-center">
                    <select onChange={(e)=>handleChange(e,user) } className="select select-bordered w-1/2  sm:w-full max-w-xs">
                        <option disabled selected>{user.role}</option>
                        <option>{user.role === 'admin'?"user":"admin"}</option>
                    
                    </select>
                
                
                </td>
              {/* <td className="py-2 px-4 border-b">
                <button onClick={() => openModal(lesson)} className="text-blue-500">
                  <CiEdit size={20} />
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleDelete(lesson._id)} className="text-red-500">
                  <AiOutlineDelete size={20} />
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
       {/* Open the modal using document.getElementById('ID').showModal() method */}
{/* 
<ReactModal
            // className="h-1/2"
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="text-center  h-80 w-80">
              <div className=" text-2xl  text-primary ">Edit</div>
              <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="lessonName"
              className="block text-gray-700 font-medium mb-2"
            >
              User Name
            </label>
            <input
              type="text"
              id="lessonName"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              placeholder="e.g., Basic Greetings"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lessonNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Lesson Number
            </label>
            <input
              type="number"
              id="lessonNumber"
              value={lessonNumber}
              onChange={(e) => setLessonNumber(e.target.value)}
              placeholder="e.g., 1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update Lesson
          </button>
        </form>
            </div>
          </ReactModal> */}

      <ToastContainer />
    </div>
  );
};

export default AllUsers ;

