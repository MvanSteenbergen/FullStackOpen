

const Person = ({ person, deletePerson }) => {

    return(
      <div>
        <li>{person.name} {person.number}
          <button onClick={(event) => {
            deletePerson(event, person.id)
          }}>Delete</button>
        </li>
      </div>
    )
  }  

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <ul>
      {personsToShow.map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />
      )}
    </ul>
  )
}

export default Persons