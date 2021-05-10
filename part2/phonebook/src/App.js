import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: 9498675309 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState()

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()

    const contactObject = {
      name: newName,
      phone: newPhone
    }

    const nameCheck = doesNameExist(newName, persons)
    
    if(nameCheck) {
      alert(`${newName} has already been added to the phonebook`)
      setNewName('')
      setNewPhone('')
    } else {
      setPersons(persons.concat(contactObject))
      setNewName('')
      setNewPhone('')
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
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <p>{person.name} {person.phone}</p>
      )}
    </div>
  )
}

export default App