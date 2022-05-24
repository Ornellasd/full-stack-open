import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_CURRENT_USER } from '../graphql/queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [buttonSelected, setButtonSelected] = useState(false)

  const { data: bookData, refetch: booksRefetch } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre }
  })

  const { data: currentUserData, refetch: currentUserRefetch } = useQuery(GET_CURRENT_USER)

  useEffect(() => {
    setBooks(bookData?.allBooks)
    if(props.showRecommendations && currentUserData?.me) {
      setSelectedGenre(currentUserData?.me.favoriteGenre)
      booksRefetch({ genre: selectedGenre })
      setButtonSelected(false)
    } else if(!buttonSelected) {
      setSelectedGenre('')
    }
  }, [bookData, props.showRecommendations, booksRefetch, buttonSelected, currentUserData, selectedGenre])

  useEffect(() => {
    currentUserRefetch()
  }, [props.page, currentUserRefetch])

  useEffect(() => {
    setGenres([...new Set(books?.flatMap(book => book.genres))])
  }, [books])

  const handleSpecificGenreSelect = (genre) => {
    setSelectedGenre(genre)
    setButtonSelected(true)
  }

  const handleClearGenre = () => {
    setSelectedGenre('')
    setButtonSelected(false)
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      {!props.showRecommendations
        ?
          <>
            <h2>books</h2>
            {buttonSelected &&
              <div>
                <span>in genre <strong>{selectedGenre}</strong></span>
                <button onClick={() => handleClearGenre()}>clear</button>
              </div> 
            }
          </>
        : 
          <div>
            <h2>recommendations</h2>
            <span>books in your favorite genre <strong>{currentUserData?.me && currentUserData?.me.favoriteGenre}</strong></span>
          </div>
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
          {books?.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
          {(!props.showRecommendations && !buttonSelected) && genres.map(genre =>
            <button onClick={() => handleSpecificGenreSelect(genre)}>{genre}</button>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books