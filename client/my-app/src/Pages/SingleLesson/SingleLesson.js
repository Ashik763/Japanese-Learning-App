import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { HiMiniSpeakerWave, HiOutlineSpeakerWave } from "react-icons/hi2";
// import { useVocabulary } from '../hooks/useVocabulary'
import Confetti from '../../Components/Confetti'
import { useVocabulary } from '../../Hooks/useVocabulary'


const SingleLesson = () => {
  const { lessonNo } = useParams()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const { vocabularyList, isLoading, error } = useVocabulary(lessonNo || '1')
  const navigate = useNavigate()

  const currentVocabulary = vocabularyList[currentIndex]
  const isLastVocabulary = currentIndex === vocabularyList.length - 1


  function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'ja-JP'; // Japanese
    window.speechSynthesis.speak(utterance);
  }

  const handleNext = () => {
    if (currentIndex < vocabularyList.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleComplete = () => {
    setShowConfetti(true)
  }

  const handleConfettiComplete = () => {
    navigate('/lessons')
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Lesson No: {lessonNo}</h2>
        <ProgressBar current={currentIndex + 1} total={vocabularyList.length} />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="border border-gray-200 rounded-lg p-6 mb-6"
          >
            {currentVocabulary ? (
              <>
                <h3 className=" flex align-middle text-2xl font-semibold mb-2 text-indigo-600">
                <span onClick={()=> pronounceWord(currentVocabulary.word)} className='cursor-pointer' >  {currentVocabulary.word}   </span> 
                  <HiOutlineSpeakerWave onClick={()=> pronounceWord(currentVocabulary.word)} className="ms-2 mt-1 text-black cursor-pointer" />



                  
                  </h3>
                <p  className="text-lg mb-2 text-gray-600"><span className='text-sm '>Pronunciation: </span> {currentVocabulary.pronunciation}</p>
                <p className="text-xl mb-4 text-gray-800"><span className='text-sm '>Meaning:</span> {currentVocabulary.meaning}</p>
                <p className="text-sm text-gray-500">"When To Use" will be here</p>
              </>
            ) : (
              <p className="text-gray-600">No vocabulary available.</p>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="bg-indigo-500 text-white px-4 py-2 rounded-full flex items-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-indigo-600"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" />
            Previous
          </button>
          {isLastVocabulary ? (
            <button
              onClick={handleComplete}
              className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center transition-all duration-200 hover:bg-green-600"
            >
              Complete
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-indigo-500 text-white px-4 py-2 rounded-full flex items-center transition-all duration-200 hover:bg-indigo-600"
            >
              Next
              <ChevronRightIcon className="h-5 w-5 ml-1" />
            </button>
          )}
        </div>
      </div>
      {showConfetti && <Confetti onComplete={handleConfettiComplete} />}
    </div>
  )
}

const ProgressBar = ({ current, total }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
    <div
      className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
      style={{ width: `${(current / total) * 100}%` }}
    ></div>
  </div>
)

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
)

const ErrorMessage = ({ message }) => (
  <div className="text-center text-red-500 mt-8">
    <p className="text-xl font-semibold">Error:</p>
    <p>{message}</p>
  </div>
)

export default SingleLesson

