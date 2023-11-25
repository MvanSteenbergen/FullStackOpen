
const Person = ({ person }) => {
    return (
      <li>{person.name} {person.number}</li>
    )
  }  

export const Persons = ({ personsToShow }) => {
  return (
    <ul>
      {personsToShow.map(person => <Person key={person.name} person={person} />
      )}
    </ul>
  )
}
