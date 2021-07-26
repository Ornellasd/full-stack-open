import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { getBlogs, createBlog } from '../reducers/blogReducer'

import Togglable from '../components/Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  const handleSubmit = event => {
    event.preventDefault()
  
    const content = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    dispatch(createBlog(content))
  }

  return (
    <Togglable buttonLabel="create new blog">
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input name="title" />
        </div>
        <div>
          author:
          <input name="author" />
        </div>
        <div>
          url:
          <input name="url" />
        </div>
        <button id="blog-submit" type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default BlogForm