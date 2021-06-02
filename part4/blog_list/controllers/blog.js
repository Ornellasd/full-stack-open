const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if(!blog.title && !blog.author) {
    console.log('both missing')
    return response.status(400).json({ error: 'title and author missing' })
  } else if(!blog.likes) {
    blog.likes = 0
  }
  
  const savedBlog = await blog.save()
  response.json(savedBlog)
})

module.exports = blogRouter