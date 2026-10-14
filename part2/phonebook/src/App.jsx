import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

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
      number: newNum,
      id: String(persons.length + 1)
    }

    const duplicate = persons.some(person => newName === person.name)

    if (duplicate) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNum('')
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

      <Persons personsToShow={personsToShow} />

    </div>
  )
}

export default App