import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    if(result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  useEffect(() => {
    setGenres([...new Set(books.map(book => book.genres))].flat())
  }, [books])

  const filterByGenre = (selectedGenre) => {
    setBooks(books.filter(book => book.genres.some(genre => genre === selectedGenre)))
    setGenre(selectedGenre)
  }

  const clearGenreFilter = () => {
    setBooks(result.data.allBooks)
    setGenre(null)
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      {props.showRecommendations
        ? 
          <>
            <h2>recommendations</h2>
            <span>books in your favorite genre <strong>GENRE</strong></span>
          </>
        : <h2>books</h2>
      }

      {genre &&
        <>
          <span>in genre <strong>{genre}</strong></span>
          <button onClick={() => clearGenreFilter() }>clear</button>
        </>
      }

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
          {!genre && genres.map(genre => 
            <button onClick={() => filterByGenre(genre)}>{genre}</button>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books