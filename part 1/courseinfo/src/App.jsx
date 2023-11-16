const Header = (course) => {
  return (
    <div>
      <h1>{course.course.name}</h1>
    </div>
  )
}

const Total = (course) => {
  console.log(course.course.parts[0].exercises)
  const nExercises = course.course.parts[0].exercises + course.course.parts[1].exercises + course.course.parts[2].exercises
  return (
    <div>
      <p>
        Number of exercises {nExercises}
      </p>
    </div>
  )
}

const Part = (info) => {
  return (
    <div>
      <p>
        {info.part} {info.exercise}
      </p>
    </div>
  )
}

const Content = (course) => {
  
  return (
    <div>
      <Part part={course.course.parts[0].name} exercise={course.course.parts[0].exercises} />
      <Part part={course.course.parts[1].name} exercise={course.course.parts[1].exercises} />
      <Part part={course.course.parts[2].name} exercise={course.course.parts[2].exercises} />
    </div>
  )
}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App