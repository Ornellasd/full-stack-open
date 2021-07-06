import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
  
    const content = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    
    dispatch(createBlog(content))
  }

  return (
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
  )
}

export default BlogForm