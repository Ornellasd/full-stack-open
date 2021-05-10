import React, { useState } from 'react'

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

const ContactDisplay = ({ contact }) => {
  return <p>{contact.name} {contact.phone}</p>
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
  const [ filter, setFilter ] = useState('')

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
      setPersons(persons.concat(contactObject))
      setNewName('')
      setNewPhone('')
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
        <ContactDisplay key={contact.id} contact={contact} />
      )}
    </div>
  )
}

export default App