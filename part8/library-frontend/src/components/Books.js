import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_CURRENT_USER } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [buttonSelected, setButtonSelected] = useState(false)

  const { data: bookData, error: booksError, loading: booksLoading, refetch: booksRefetch } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre }
  })

  const currentUser = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    pollInterval: 500,
  })

  useEffect(() => {
    setBooks(bookData?.allBooks)
    if(props.showRecommendations) {
      setSelectedGenre(currentUser.data?.me.favoriteGenre)
      booksRefetch({ genre: selectedGenre })
      setButtonSelected(false)
    } else if(!buttonSelected) {
      setSelectedGenre('')
    }
  }, [bookData, props.showRecommendations])

  useEffect(() => {
    setGenres([...new Set(books?.map(book => book.genres))].flat())
  }, [books])

  // useEffect(() => {
  //   if(props.showRecommendations) {

  //   }
  // }, [currentUser.data.me])


  // const filterByGenre = (selectedGenreDERP, rec) => {
  //   setBooks(books.filter(book => book.genres.some(genre => genre === selectedGenre)))
  //   if(!rec) {
  //     setSelectedGenre(selectedGenreDERP)
  //   }
  // }

  // const filterByGenre2 = (genre) => {
  //   setSelectedGenre(genre)
  //   booksRefetch({ genre })
  //   console.log(bookData, 'after refetch')
  // }

  // const clearGenreFilter = () => {
  //   setBooks(bookData?.allBooks)
  //   setSelectedGenre('')
  // }

  // useEffect(() => {
  //   if(props.showRecommendations && favoriteGenre) {
  //     // make this use graphql 
  //     // filterByGenre(favoriteGenre, true)
  //     filterByGenre2(favoriteGenre)
  //   } else if(bookData?.allBooks) {
  //     setBooks(bookData?.allBooks)
  //   }
  // }, [props.showRecommendations, bookData])



  // useEffect(() => {
  //   if(currentUser.data && currentUser.data.me) {
  //     setFavoriteGenre(currentUser.data.me.favoriteGenre)
  //   }
  // }, [currentUser.data])

  

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
            <span>books in your favorite genre <strong>{currentUser.data?.me.favoriteGenre}</strong></span>
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

  // return (
  //   <div>
  //     {props.showRecommendations
  //       ? 
  //         <>
  //           <h2>recommendations</h2>
  //           <span>books in your favorite genre <strong>{favoriteGenre}</strong></span>
  //         </>
  //       : <h2>books</h2>
  //     }

  //     {selectedGenre &&
  //       <>
  //         <span>in genre <strong>{selectedGenre}</strong></span>
  //         <button onClick={() => clearGenreFilter() }>clear</button>
  //       </>
  //     }


  //   </div>
  // )
}

export default Books