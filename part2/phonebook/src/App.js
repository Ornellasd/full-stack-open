import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleContactFilter = (event) => {
    // change to .filter? 
    persons.forEach(person => {
      if(person.name.toLowerCase().includes(event.target.value.toLowerCase())){
        console.log(person.name)
      }
    })
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
      filter shown with <input onChange={handleContactFilter} />
      <h2>add a new</h2>
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