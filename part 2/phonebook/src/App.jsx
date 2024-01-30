import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import Notification from './Components/Notification'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])
  const [notification, setNotification] = useState(null)
  const [color, setColor] = useState('green')

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilter(filter)
        setPersonsToShow(initialPersons)
      })
  }, [])

  useEffect(() => {
    if(persons) {
      setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
    }
  }, [persons, filter])

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
          setColor('green')
          setNotification(
            `Added '${newObject.name}'`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(() => alert("Failed to add person"))

    } else {
      if (window.confirm(`${newName} is already added to the phonebook, do you want to change the person's number?`)) {
      const oldObject = persons.find(person => person.name === newName)

        const newObject = {
          name: newName,
          number: newNumber,
        }
        
      personServices
        .update(oldObject.id, newObject)
        .then(response => {
          setPersons(persons.map(person => person.name !== oldObject.name ? person : response))
          setNewName('')
          setNewNumber('')
        })
      }

    }
  }

  const deletePerson = (event, id) => {
    const deletedPerson = persons.find(n => n.id === id)
    event.preventDefault()
    if (window.confirm(`Do you really want to delete this person?`)) {
      personServices
        .deletePerson(id)
        .then(() => {
            setPersons(persons.filter(person => person.id != id))
            setPersonsToShow(persons.filter(person => person.id != id).filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))) 
        })
        .catch(() => {
          setColor("red")
          setNotification(
            `Information about ${deletedPerson.name} has already been removed from the server`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })

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
      <Notification  color={color} message={notification} />
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