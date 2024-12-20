import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'


export function useVocabulary(lessonNo) {
  const [vocabularyList, setVocabularyList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    fetch(`http://localhost:5000/lessons/${lessonNo}/words`,{
          method: "GET", 
          headers: {
            "Content-Type": "application/json", 
            Authorization: Cookies.get('token') ,
          },
        })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch vocabulary')
        return res.json()
      })
      .then((data) => {
        setVocabularyList(data)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err)
        setIsLoading(false)
      })
  }, [lessonNo])

  return { vocabularyList, isLoading, error }
}

