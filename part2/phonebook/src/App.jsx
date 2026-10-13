import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const [searchFilter, setSearchFilter] = useState('')

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
      <form>
        <div>
          filter shown with
          <input
            value={searchFilter}
            onChange={handleFilterChange}
          />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>name:
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>number:
          <input
            value={newNum}
            onChange={(event) => setNewNum(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App