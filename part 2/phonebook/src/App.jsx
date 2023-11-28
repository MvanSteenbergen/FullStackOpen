import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        const initialPersons = response.data
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
    
      axios
        .post('http://localhost:3001/persons', newObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setPersonsToShow(persons.concat(response.data).filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
        })
        .catch(() => alert("Failed to add person"))

    } else {
      alert(`${newName} is already added to the phonebook`)
    }
  }

  const deletePerson = (event, id) => {
    event.preventDefault()

    axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then(() => {
          setPersons(persons.filter(person => person.id != id))
          setPersonsToShow(persons.filter(person => person.id != id).filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))  
      })
      .catch(() => alert("Failed to delete"))

    axios
      .get('http://localhost:3001/persons/')
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
        setPersonsToShow(response.data.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
      })
      .catch(() => alert("Failed to delete person"))
        

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