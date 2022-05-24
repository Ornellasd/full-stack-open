const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const pubsub = new PubSub()
const JWT_SECRET = process.env.JWT_SECRET

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author })

      if(args.genre && args.author) {
        return await Book.find({ author: author._id, genres: { $in: args.genre } }).populate('author') 
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
      const author = await Author.findOne({ name: root.name }).populate('bookList')
      return author.bookList.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let book;

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
        let author = await Author.findOne({ name: args.author })
  
        if(!author) {
          author = await new Author({ name: args.author })
        }
  
        book = new Book({ ...args, author })

        author.bookList = author.bookList.concat(book)

        await author.save()
        await book.save()

      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers