const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  if(!request.token || !request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(request.user._id)

  if(!body.title && !body.author) {
    return response.status(400).json({ error: 'title and author missing' })
  } else if(!body.likes) {
    body.likes = 0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)
  
  if(!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } else if(blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: `blog not owned by ${decodedToken.username}`})
  }
})

blogRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.json(blog)
})

module.exports = blogRouter