import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }

    const nameCheck = doesNameExist(newName, persons)
    
    if(nameCheck === true) {
      alert(`${newName} has already been added to the phonebook`)
      setNewName('')
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
    }
  }

  const doesNameExist = (name, persons) => {
    let result
    
    persons.forEach(person => {
      result = person.name === newName
    })

    return result
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <p>{person.name}</p>
      )}
    </div>
  )
}

export default App