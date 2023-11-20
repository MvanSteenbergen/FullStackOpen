import { useState } from 'react'


const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ name, value }) => {
  let percent = ""
  if (name == "positive") percent += "%"
  return(
    <tr>
      <td>{name}</td>
      <td>{value}</td>
      <td>{percent}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, total}) => {
  if (total === 0) {
    return <p>No feedback given</p>
  }

  return(
    <table>
      <tbody>
        <StatisticLine name="good" value={good}></StatisticLine>
        <StatisticLine name="neutral" value={neutral}></StatisticLine>
        <StatisticLine name="bad" value={bad}></StatisticLine>
        <StatisticLine name="all" value={total}></StatisticLine>
        <StatisticLine name="average" value={((good*1)+(neutral*0)+(bad*-1))/total}></StatisticLine>
        <StatisticLine name="positive" value={good/total}></StatisticLine>
      </tbody>
    </table>
  )
}

const App = () => {

  const handleClickGood = () => {
    console.log("Good increased by one, was", good)
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
  }

  const handleClickNeutral = () => { 
    console.log("Neutral increased by one, was", neutral)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
  }

  const handleClickBad = () => {
    console.log("Bad increased by one, was", bad)
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + neutral + updatedBad)
  }

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text="good" />
      <Button handleClick={handleClickNeutral} text="neutral" />
      <Button handleClick={handleClickBad} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}></Statistics>
    </div>
  )
}

export default App