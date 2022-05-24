import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { updateCache } from '../App'
import { ALL_AUTHORS, ALL_BOOKS } from '../graphql/queries'
import { CREATE_BOOK } from '../graphql/mutations'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS,
        variables: {
          genre: '',
        } 
      }, response.data.addBook)
    },
    refetchQueries: [
      { query: ALL_AUTHORS },
    ],
    onError: (error) => {
      props.setNotification({
        text: error.graphQLErrors.length > 0 ? error.graphQLErrors[0].message : 'Error with book details',
        type: 'danger',
      })
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: 
        { 
          title,
          author, 
          genres,
          'published': parseInt(published),
        } 
    })
    
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.toLowerCase()))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(', ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook