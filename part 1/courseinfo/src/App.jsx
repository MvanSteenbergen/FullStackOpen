const Header = (course) => {
  return (
    <div>
      <h1>{course.course}</h1>
    </div>
  )
}

const Total = (n) => {
  return (
    <div>
      <p>
        Number of exercises {n.n}
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

const Content = (info) => {
  return (
    <div>
      <Part part={info.part[0]} exercise={info.exercise[0]} />
      <Part part={info.part[1]} exercise={info.exercise[1]} />
      <Part part={info.part[2]} exercise={info.exercise[2]} />
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <div>
      <Header course={course} />
      <Content part={[part1, part2, part3]} exercise={[exercises1, exercises2, exercises3]} />
      <Total n={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App