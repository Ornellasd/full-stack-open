  
import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import { SET_BORN } from '../mutations'
import Select from 'react-select'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [authors, setAuthors] = useState([])
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [born, setBorn] = useState('')

  const [ changeBorn ] = useMutation(SET_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  useEffect(() => {
    if(result.data) {
      setAuthors(result.data.allAuthors)
    }
  }, [result])

  if (!props.show) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    changeBorn({ 
      variables: {
        "name": selectedAuthor.value,
        "born": parseInt(born)
      } 
    })

    setSelectedAuthor(null)
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={handleSubmit}>
          <Select
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            options={
              authors.map(author => {
                return {
                  value: author.name,
                  label: author.name
                }
              })
            }
          />
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
