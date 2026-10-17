import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [notif, setNotif] = useState(null)
  const [isError, setIsError] = useState(false)

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

    const duplicatePerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    const isDuplicate = !!duplicatePerson;
    const duplicateId = duplicatePerson ? duplicatePerson.id : null;

    if (isDuplicate) {
      if (window.confirm
        (`${newName} is already added to phonebook, replace the old number with a new one?`)
      ) {
        const updatedPerson = { ...duplicatePerson, number: newNum }
        personService
          .update(duplicateId, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== duplicateId ? person : returnedPerson))
            setIsError(false)
            setNotif(`Updated ${returnedPerson.name}`)
            setTimeout(() => setNotif(null), 5000)
            setNewName('')
            setNewNum('')
          })
          .catch(error => {
            setIsError(true)
            setNotif(`Information of '${duplicatePerson.name}' has already been removed from server`)
            setPersons(persons.filter(p => p.id !== duplicateId))
            setTimeout(() => setNotif(null), 5000)
          })
      }
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setIsError(false)
        setPersons(persons.concat(returnedPerson))
        setNotif(`Added ${returnedPerson.name}`)
        setTimeout(() => setNotif(null), 5000)
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
    }
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <Notification message={notif} isError={isError}/>

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