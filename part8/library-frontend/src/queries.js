import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query getAllBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      id
      genres
      author {
        name
        id
      }
    }
  }
`

export const GET_CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`