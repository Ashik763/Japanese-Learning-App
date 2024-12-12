import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import ReactModal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie'
import Spinner from "../Shared/Spinner/Spinner";

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






const ViewAllVocabularies = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [_id,setId] = useState("");

    const [word, setWord] = useState("");
    const [pronunciation, setPronunciation] = useState("");
    const [meaning, setMeaning] = useState("");
    const [whenToSay, setWhenToSay] = useState("");
    const [lessonNo, setLessonNo] = useState("");

//     const [updatedText, setUpdatedText] = useState('');
  
//   const [editingLesson, setEditingLesson] = useState(null);

  function openModal(word) {
    console.log(word);
    setId(word._id);
    setWord(word.word)
    setPronunciation(word.pronunciation);
    setMeaning(word.meaning||"");
    setWhenToSay(word.whenToSay|| "");
    setLessonNo(word.lessonNo || "3")
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
    console.log();
    fetch(
      `http://localhost:5000/words/update/${_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
           Authorization: Cookies.get('token') ,
          
        },
        body: JSON.stringify({
          word,
          pronunciation,
          meaning,
          whenToSay,
          lessonNo,
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
    fetch(`http://localhost:5000/words/all`, {
        method: "GET", 
        headers: {
        "Content-Type": "application/json", 
        Authorization: Cookies.get('token') ,
        },
    })
      .then((response) => response.json())
      .then((data) => {
        setWords(data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching lessons:", error);
        setLoading(false);
      });
  };

  const handleDelete = (_id) => {
    fetch(`http://localhost:5000/words/delete/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", 
        Authorization: Cookies.get('token') ,
      },
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

  if (loading) {
    return <Spinner></Spinner> ;
  }

  return (
    <div className="border relative  w-full mx-auto my-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4 text-center ">All Lessons</h1> */}
      <table className=" absolute right-2 top-2 w-full md:w-4/5 border  bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Word</th>
            <th className="py-2 px-4 border-b">Meaning</th>
 
            <th className="py-2 px-4 border-b"> Pronunciation </th>
            <th className="py-2 px-4 border-b"> When to say   </th>
            <th className="py-2 px-4 border-b">Lesson No</th>
            <th className="py-2 px-4 border-b">Edit</th>
            <th className="py-2 px-4 border-b">Delete</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word._id}>
              <td className="py-2 px-4 border-b text-center">{word.word}</td>
              <td className="py-2 px-4 border-b text-center">{word.meaning}</td>
              <td className="py-2 px-4 border-b text-center">{word.pronunciation}</td>
              <td className="py-2 px-4 border-b text-center">{word.whenToSay || "When to say"}</td>
              <td className="py-2 px-4 border-b text-center">{word.lessonNo || "Lesson No"}</td>
              <td className="py-2 px-4 border-b text-center">
                <button onClick={() => openModal(word)} className="text-blue-500 text-center">
                  <CiEdit size={20} />
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleDelete(word._id)} className="text-red-500 text-center">
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
            <div className="text-center sm:w-auto  md:w-96 ">
              <div className=" text-2xl  text-primary ">Edit</div>
              <form onSubmit={handleSubmit}>
              <div className="mb-4">
            <label
              htmlFor="word"
              className="block text-gray-700 font-medium mb-2"
            >
             Japanese Word
            </label>
            <input
              type="text"
              id="word"
              value={word}
              required
              onChange={(e) => setWord(e.target.value)}
              placeholder="e.g., こんばんは"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="meaning"
              className="block text-gray-700 font-medium mb-2"
            >
             Meaning
            </label>
            <input
              type="text"
              id="meaning"
              value={meaning}
              required
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="e.g., こんばんは"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="pronunciation"
              className="block text-gray-700 font-medium mb-2"
            >
              Pronunciation
            </label>
            <input
              type="text"
              id="pronunciation"
              value={pronunciation}
              onChange={(e) => setPronunciation(e.target.value)}
              placeholder=""
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="whenToSay"
              className="block text-gray-700 font-medium mb-2"
            >
             When To Say
            </label>
            <input
              type="text"
              id="whenToSay"
              value={whenToSay}
              required
              onChange={(e) => setWhenToSay(e.target.value)}
              placeholder=""
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lessonNo"
              className="block text-gray-700 font-medium mb-2"
            >
             Lesson Number
            </label>
            <input 
              type="number"
              id="lessonNo"
              value={lessonNo}
              required
              onChange={(e) => setLessonNo(e.target.value)}
              placeholder=""
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>




          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update Word
          </button>
        </form>
            </div>
          </ReactModal>

      <ToastContainer />
    </div>
  );
};

export default ViewAllVocabularies;

