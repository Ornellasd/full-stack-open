import React, { useState } from 'react'

const Heading = ({ text }) => {
  return <h2>{text}</h2>
}

const ContactInput = ({ submit, name, phone, nameChange, phoneChange }) => {
  return (
    <form onSubmit={submit}>
      <div>
        name: <input value={name} onChange={nameChange} />
      </div>
      <div>
        number: <input value={phone} onChange={phoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const FilterInput = ({ text, change }) => {
  return (
    <div>
      {text} <input onChange={change} />
    </div>
  ) 
}

const ContactDisplay = ({ data }) => {
  return (
    <div>
      {data.map(person => 
        <p>{person.name} {person.phone}</p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

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
        // setNewSearch(person.name)
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
      <Heading text="Phonebook" />
      <FilterInput text="filter shown with" change={handleContactFilter} />
      <Heading text="add a new" />
      <ContactInput submit={addContact} name={newName} phone={newPhone} nameChange={handleNameChange} phoneChange={handlePhoneChange} />
      <Heading text="Numbers" />      
      <ContactDisplay data={persons} />
    </div>
  )
}

export default App