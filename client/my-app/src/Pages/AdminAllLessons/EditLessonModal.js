import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const EditLessonModal = ({ isOpen, onClose, lesson, onUpdate }) => {
  const [editedLesson, setEditedLesson] = useState({
    id: 0,
    name: "",
    number: 0,
    vocabularyCount: 0,
  });

  useEffect(() => {
    if (lesson) {
      setEditedLesson(lesson);
    }
  }, [lesson]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedLesson((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedLesson);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Edit Lesson
              </Dialog>
              <form onSubmit={handleSubmit}>
                <div className="mt-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Lesson Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={editedLesson.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                    Lesson Number
                  </label>
                  <input
                    type="number"
                    name="number"
                    id="number"
                    value={editedLesson.number}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="vocabularyCount" className="block text-sm font-medium text-gray-700">
                    Vocabulary Count
                  </label>
                  <input
                    type="number"
                    name="vocabularyCount"
                    id="vocabularyCount"
                    value={editedLesson.vocabularyCount}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </Transition>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditLessonModal;

