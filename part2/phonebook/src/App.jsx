import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value)
  }

  const personsToShow = searchFilter === ''
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(searchFilter.toLowerCase())
    )

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNum
    }

    const duplicate = persons.some(person => newName === person.name)

    if (duplicate) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNum('')
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deleteP(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`The entry for ${name} was already deleted from server`)
          setPersons(persons.filter(person => person.id !== id))
        })
      console.log('delete button clicked ' + id)
    }
  }

    return (
      <div>

        <h2>Phonebook</h2>

        <Filter searchFilter={searchFilter} handleFilterChange={handleFilterChange} />

        <h3>add a new</h3>

        <PersonForm addName={addName}
          newName={newName} handleNameChange={(event) => setNewName(event.target.value)}
          newNum={newNum} handleNumChange={(event) => setNewNum(event.target.value)}
        />

        <h3>Numbers</h3>

        <Persons personsToShow={personsToShow} deletePerson={deletePerson} />

      </div>
    )
  }

  export default App