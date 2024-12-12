import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';

const Confetti = ({ onComplete }) => {
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight })
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const detectSize = () => {
      setWindowDimension({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', detectSize)

    const timer = setTimeout(() => {
      setIsActive(false)
      onComplete()
    }, 5000)

    return () => {
      window.removeEventListener('resize', detectSize)
      clearTimeout(timer)
    }
  }, [onComplete])

  return (
    <>
      {isActive && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
    </>
  )
}

export default Confetti

