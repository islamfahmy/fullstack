import React from 'react'
import Course from './components/Course.js'

const App = ({courses}) => {
  return (
    <div>
      <Course Courses={courses} />
    </div>
  )
}
export default App