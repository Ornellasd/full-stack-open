import { gql } from '@apollo/client'
import { BOOK_DETAILS } from './fragments'

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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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