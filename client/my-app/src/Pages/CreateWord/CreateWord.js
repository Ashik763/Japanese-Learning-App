import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/AuthProvider";

const CreateWord = () => {
  const [word, setWord] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [meaning, setMeaning] = useState("");
  const [whenToSay, setWhenToSay] = useState("");
  const [lessonNo, setLessonNo] = useState("");


  const {user} = useContext(AuthContext);
  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();


        fetch('http://localhost:5000/words/create-a-word', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
              word, pronunciation, meaning, whenToSay, lessonNo, createdBy:user.name
            })
          })
          .then(res => res.json())
            .then((res) => {
              setWord("");
              setPronunciation("");
              setMeaning("");
              setWhenToSay("");
              setLessonNo("");
          
              toast(res.message)
                
            
              
      
            })
            .catch((error) => {
                toast("Something went wrong");
            }).finally(() => {
            //   setLoading(false);
            });


    
  };
//   from-blue-500 to-sky-50
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r ">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Create a New Lesson</h2>
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
            Create Lesson
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateWord;