// import Link from 'next/link'
// import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
import { Cherry, CherryIcon as Sakura } from 'lucide-react'
import { Link } from 'react-router-dom'


export default function LessonCard({ lesson }) {
  console.log(lesson);
  return (
    <div>
    <div className="card  transition-all hover:shadow-lg">
      <div className=" card-title bg-gradient-to-r from-sky-100 to-sky-50 p-6">
        <div className="flex items-center justify-between">
          <Sakura className="h-8 w-8 text-sky-500" />
          <span className="text-sm font-semibold text-gray-500">Lesson {lesson.number}</span>
        </div>
        <h3 className="mt-4 text-2xl font-bold text-gray-800">{lesson.name}</h3>
      </div>
      <div className="p-6 card-body">
        <p className="text-gray-600">
          <Cherry className="mr-2 inline-block h-5 w-5 text-sky-400" />
          {lesson.vocabularyCount} vocabulary words
        </p>
      </div>
      <div className="card-actions bg-gray-50 p-6">
        
          <Link className="w-full bg-sky-500 hover:bg-sky-600 btn btn-outline " to={`/lessons/${lesson._id}/words`}>Start Lesson</Link>
       
      </div>
    </div>
    </div>
  )
}

