import React, { useEffect, useState } from 'react'
import personService from './services/persons'

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

const FilterInput = ({ text, change }) => <div>{text} <input onChange={change} /></div> 

const Contact = ({ contact, deletePhonebookEntry }) => {
  return (
    <div>
      <p>{contact.name} {contact.phone}</p>
      <button onClick={deletePhonebookEntry}>Delete</button>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')

  const fetchNotes = () => {
    personService
      .getAll()
        .then(initialEntries => {
          setPersons(initialEntries)
        })
  }

  const deletePhonebookEntry = (id) => {
    const entry = persons.find(p => p.id === id)

    if(window.confirm(`Delete ${entry.name}?`)) {
      personService
        .deleteItem(id)
        .then(updatedEntries => {
          console.log(updatedEntries)
        })
    }
    //personService
    //  .deleteItem(id)
  }

  useEffect(fetchNotes, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleContactFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const addContact = (event) => {
    event.preventDefault()

    const contactObject = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1
    }

    if(persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} has already been added to the phonebook`)
      setNewName('')
      setNewPhone('')
    } else {
      personService
        .create(contactObject)
        .then(returnedEntry => {
          setPersons(persons.concat(returnedEntry))
          setNewName('')
          setNewPhone('')
        })
    }    
  }
  
  const contactsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput text="filter shown with" change={handleContactFilter} />
      <h2>add a new</h2>
      <ContactInput submit={addContact} name={newName} phone={newPhone} nameChange={handleNameChange} phoneChange={handlePhoneChange} />
      <h2>Numbers</h2>      
      {contactsToShow.map(contact => 
        <Contact
          key={contact.id}
          contact={contact}
          deletePhonebookEntry={() => deletePhonebookEntry(contact.id)}
        />
      )}
    </div>
  )
}

export default App