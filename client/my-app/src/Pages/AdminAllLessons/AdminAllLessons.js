import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import ReactModal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import EditLessonModal from "./EditLessonModal";



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






const AdminAllLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [lessonName, setLessonName] = useState("");
  const [lessonNumber, setLessonNumber] = useState("");
  const [lessonId, setLessonId] = useState("");
    const [updatedText, setUpdatedText] = useState('');
  
  const [editingLesson, setEditingLesson] = useState(null);

  function openModal(lesson) {
    console.log(lesson);
    setLessonName(lesson.name);
    setLessonNumber(lesson.number);
    setLessonId(lesson._id);
    setIsOpen(true);
  }

  function closeModal() {}
  const handleSubmit = async (e) => {
    handleUpdate(e);
    setIsOpen(false);
    closeModal();
  };
  const handleUpdate = (e) => {
    console.log("clicked");
    console.log(lessonId);
    fetch(
      `http://localhost:5000/lessons/update/${lessonId}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          lessonName,
          lessonNo: lessonNumber
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        toast("Successfully Updated");
        setLoading(true);
        fetchLessons();
      });
  };


  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = () => {
    setLoading(true);
    fetch(`http://localhost:5000/lessons/all`)
      .then((response) => response.json())
      .then((data) => {
        setLessons(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching lessons:", error);
        setLoading(false);
      });
  };

  const handleDelete = (_id) => {
    fetch(`http://localhost:5000/lessons/delete/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setLoading(true);
        fetchLessons();
        toast.success("Lesson successfully deleted");
      })
      .catch((error) => {
        console.error("Error deleting lesson:", error);
        toast.error("Failed to delete lesson");
      });
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  // const handleUpdateLesson = (updatedLesson) => {
  //   fetch(`http://localhost:5000/lessons/${updatedLesson.id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedLesson),
  //   })
  //     .then((res) => res.json())
  //     .then(() => {
  //       fetchLessons();
        
  //       toast.success("Lesson updated successfully");
  //     })
  //     .catch((error) => {
  //       console.error("Error updating lesson:", error);
  //       toast.error("Failed to update lesson");
  //     });
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border relative  w-full mx-auto my-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Lessons</h1>
      <table className=" absolute right-2 top-2 w-full md:w-4/5 border  bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Lesson Name</th>
            <th className="py-2 px-4 border-b">Lesson Number</th>
            <th className="py-2 px-4 border-b">Vocabulary Count</th>
            <th className="py-2 px-4 border-b">Edit</th>
            <th className="py-2 px-4 border-b">Delete</th>
          </tr>
        </thead>
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson.id}>
              <td className="py-2 px-4 border-b">{lesson.name}</td>
              <td className="py-2 px-4 border-b">{lesson.number}</td>
              <td className="py-2 px-4 border-b">{lesson.vocabularyCount}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => openModal(lesson)} className="text-blue-500">
                  <CiEdit size={20} />
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleDelete(lesson._id)} className="text-red-500">
                  <AiOutlineDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* Open the modal using document.getElementById('ID').showModal() method */}

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
              Lesson Name
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
          </ReactModal>

<button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button>
      <ToastContainer />
    </div>
  );
};

export default AdminAllLessons;

