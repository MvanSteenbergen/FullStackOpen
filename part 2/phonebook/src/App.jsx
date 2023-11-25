import { useState } from 'react'
import { Filter } from './Components/Filter'
import { PersonForm } from './Components/PersonForm'
import { Persons } from './Components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(name => name.name).indexOf(newName) === -1) {
      const name = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(name))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to the phonebook`)
    }
  }
  
  const handleNameAdd = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberAdd = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        value={filter} 
        handleFilter={handleFilter}   
      />
      <h3>Add a person</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameAdd={handleNameAdd}
        newNumber={newNumber}
        handleNumberAdd={handleNumberAdd}
      />
      <h3>Numbers</h3>
      <Persons 
        personsToShow={personsToShow}   
      />
    </div>
  )
}

export default App