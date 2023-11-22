import { useLayoutEffect } from "react"

const Header = ( {course} ) => {
    return (
      <div>
        <h1>
          {course.name}
        </h1>
      </div>
    )
  }
  
  
  const Part = (info) => {
    return (
      <div>
        <p>
          {info.name} {info.exercises}
        </p>
      </div>
    )
  }
  
  const Course = ( {course} ) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} /> 
        <Total course={course} />
      </div>
    )
  } 
  
  const Content = ( {course} ) => {
    const parts = course.parts
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} name={part.name}  exercises={part.exercises}/>
        )}
      </div>
    )
  }
  
  const Total = ( {course} ) => {
    const parts = course.parts
    return (
      <div>
        <p><b>Total of {parts.reduce((accumulator = 0, currentValue) => accumulator + currentValue.exercises, 0,)} exercises</b></p>
      </div>
    )
  }
  

export default Course