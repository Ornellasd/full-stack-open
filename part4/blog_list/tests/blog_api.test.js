const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(response.body.length)
})

test('identifier is named "id"', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body[0]._id).toBeDefined()
})

test('HTTP post creates post', async () => {
  const newBlog = {
    title: 'HTTP Post successfully creates blog post',
    author: 'David O.',
    url: 'www.ornell.as',
    likes: 420
  }

  const test = await api
    .post('/api/blogs')
    .send(newBlog)
  
  const blogList = await api.get('/api/blogs')

  expect(test.body).toEqual(blogList.body.slice(-1)[0])    
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
    likes: 420696964
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})