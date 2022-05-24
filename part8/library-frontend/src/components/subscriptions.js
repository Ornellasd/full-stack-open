import { gql } from '@apollo/client'

// add fragment to this and mutation!!!

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
      id
      author {
        id
        name
      }
    }
  }
`