const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const JWT_SECRET = process.env.JWT_SECRET

console.log('connecting to ', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('conected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author })

      if(args.genre && args.author) {
        return await Book.find({ author: author._id, genres: { $in: args.genre } })    
      } else if(args.author) {
        return await Book.find({ author: author._id }).populate('author')
      } else if(args.genre) {
        return await Book.find({ genres: { $in: args.genre } }).populate('author')
      } else {
        return await Book.find({}).populate('author')
      }
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      return Book.find({ author: root._id }).countDocuments()
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if(!context.currentUser) {
        throw new AuthenticationError('User is not logged in.')
      }

      if(args.title.length < 3) {
        throw new UserInputError('Book title is too short.')
      }

      if(args.author.length < 3) {
        throw new UserInputError('Author name is too short.')
      }

      try {
        const author = await Author.findOne({ name: args.author })
        let authorId
  
        if(!author) {
          const newAuthor = new Author({ name: args.author })
          newAuthor.save()
          authorId = newAuthor._id
        } else {
          authorId = author._id
        }
  
        const book = new Book({ ...args, author: authorId })
        return book.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if(!context.currentUser) {
        throw new AuthenticationError('User is not logged in.')
      }

      try {
        return await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true } )
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if( !user || args.password !== 'secret' ) {
        throw new UserInputError('Wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization: null
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})