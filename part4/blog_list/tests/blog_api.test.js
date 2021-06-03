const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

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

test('identifier is named "id"', async () => {

  const newBlog = {
    title: 'Post has id',
    author: 'David O.',
    url: 'www.ornell.as',
    likes: 426
  }

  const test = await api
    .post('/api/blogs')
    .send(newBlog)
  
  expect(test.body._id).toBeDefined()
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
    .expect(400)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete._id}`)
    .expect(204)

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

afterAll(() => {
  mongoose.connection.close()
})