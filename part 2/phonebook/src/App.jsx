import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilter(filter)
        setPersonsToShow(initialPersons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLowerCase())))
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(name => name.name).indexOf(newName) === -1) {
      const newObject = {
        name: newName,
        number: newNumber,
      }
    
      personServices
        .create(newObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setPersonsToShow(persons.concat(response).filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
        })
        .catch(() => alert("Failed to add person"))

    } else {
      if (window.confirm(`${newName} is already added to the phonebook, do you want to change the person's number?`)) {
        const newObject = {
          name: newName,
          number: newNumber,
        }
        
      personServices
        .update(newName, newObject)
        .then(response => {
          setPersons(persons.map(newObject => newObject.name !== name ? newObject : response.data))
          setNewName('')
          setNewNumber('')
          setPersonsToShow()
        })
      }
    }
  }

  const deletePerson = (event, id) => {
    event.preventDefault()
    if (window.confirm(`Do you really want to delete this person?`)) {
      personServices
        .deletePerson(id)
        .then(() => {
            setPersons(persons.filter(person => person.id != id))
            setPersonsToShow(persons.filter(person => person.id != id).filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))  
        })
        .catch(() => alert("Failed to delete"))

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
    setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

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
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App