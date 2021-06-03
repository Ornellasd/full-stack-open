const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if(!blog.title && !blog.author) {
    return response.status(400).json({ error: 'title and author missing' })
  } else if(!blog.likes) {
    blog.likes = 0
  }
  
  const savedBlog = await blog.save()
  response.json(savedBlog)
})

blogRouter.get('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogRouter