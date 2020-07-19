import React from 'react'
const Course = ({Courses}) => {
  var num =0
  return(
   Courses.map(course =>
   <div>
    <h1>{course.name}</h1>
    {course.parts.map(part =><li>{part.name} {part.exercises}</li>)}
    <t><b>total of</b></t> {course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises,num)} <t><b>exercises</b></t>
    </div>)
         )
}
export default Course