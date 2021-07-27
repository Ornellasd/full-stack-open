import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { getBlogs, upvote } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  if(user.username !== blog.user.username) {
    console.log(user, 'user')
    console.log(blog, 'blog')
  }

  const dispatch = useDispatch()

  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const deleteBlog = async () => {
    if(window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(blog.id)
      dispatch(getBlogs())
    }
  }

  const showDetails = () => {
    if(!detailsVisible) {
      return (
        <div style={blogStyle} className="unexpanded">
          {blog.title} {blog.author} <button className="view-button" onClick={toggleVisibility}>view</button>
        </div>
      )
    } else {
      return (
        <div style={blogStyle} className="expanded">
          <p>{blog.title} <button onClick={toggleVisibility}>hide</button></p>
          <p>{blog.url}</p>
          <p>{blog.likes} <button className="like-button" onClick={() => dispatch(upvote(blog))}>like</button></p>
          <p>{blog.author}</p>
          {(user && user.username === blog.user.username) &&
            <button className="remove-button" onClick={() => deleteBlog()}>remove</button>
          }
        </div>
      )
    }
  }

  return showDetails()
}

export default Blog