const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token

beforeAll(async () => {
  await User.deleteMany({})

  const user = await api
    .post('/api/users')
    .send(helper.initialUser)
  
  //console.log(user.body)
  const login = await api
    .post('/api/login')
    .send({
      username: helper.initialUser.username,
      password: helper.initialUser.password
    })

  token = login.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('all notes are returned', async () => {
  const response = await helper.blogsInDb()

  expect(response).toHaveLength(helper.initialBlogs.length)
})

test('identifier is named id', async () => {
  const newBlog = {
    title: 'Post has id',
    author: 'David O.',
    url: 'www.ornell.as',
    likes: 426
  }

  const test = await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: 'bearer ' + token })
  
  expect(test.body.id).toBeDefined()
})

test('HTTP post creates post', async () => {
  const newBlog = {
    title: 'HTTP Post successfully creates blog post',
    author: 'David O.',
    url: 'www.ornell.as',
    likes: 426
  }

  const test = await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: 'bearer ' + token })
  
  const blogsAtEnd = await helper.blogsInDb()
  const blogToView = JSON.parse(JSON.stringify(blogsAtEnd[2]))

  expect(blogToView._id).toBe(test.body._id)
})

test('likes is zero if missing', async () => {
  const newBlog = {
    title: 'Change likes to zero test',
    author: 'David O.',
    url: 'www.ornell.as'
  }

  const test = await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: 'bearer ' + token })
  
  expect(test.body.likes).toBe(0)  
})

test('verifies title and url properties exist', async () => {
  const newBlog = {
    url: 'www.ornell.as',
    likes: 426
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: 'bearer ' + token })
    .expect(400)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  const test = await api
    .delete(`/api/blogs/${blogToDelete._id}`)
    .set({ Authorization: 'bearer ' + token }) 
    .expect(204)
  // post needs to be owned by test user!
  console.log(test.body, 'test.body?')
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )
})

test('test that put request updates blog post', async () => {
  const blogsAtStart = await helper.blogsInDb()
  
  const targetedElement = blogsAtStart[0]._id
  const updatedBlog = {
     title: 'Lorem ipsum dolor sit amet.',
      author: 'David Ornellas',
      url: 'www.ornell.as',
      likes: 12
  }

  const test = await api
    .put(`/api/blogs/${targetedElement}`)
    .send(updatedBlog)
  
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd[0].author).toBe('David Ornellas')
})

test('username required', async () => {
  const user = {
    name: 'Hank Hill',
    password: 'propane'
  }

  await api
    .post('/api/users')
    .send(user)
    .expect(400)
})

test('password cannot be under 3 characters', async () => {
  const user = {
    name: 'Hank Hill',
    password: 'a'
  }

  await api
    .post('/api/users')
    .send(user)
    .expect(400)
})


afterAll(() => {
  mongoose.connection.close()
})