import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import { upvote } from '../reducers/blogReducer'

const Blog = ({ loggedInUser }) => {
  const id = useParams().id
  const dispatch = useDispatch()
  
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === id) 

  if(!loggedInUser || !blog ) {
    return null
  }
  
  const handleUpvote = () => {
    const upvotedBlog = {...blog, likes: blog.likes += 1, user: blog.user.id}
    dispatch(upvote(upvotedBlog))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} <button className="like-button" onClick={() => handleUpvote()}>like</button></p>
      <p>added by {blog.user.name}</p>
      <h3>comments</h3>
      <span>
        <input />
        <button>add comment</button>
      </span>
      
      {blog.comments.length > 0 &&
        <ul>
          {blog.comments.map(comment =>
            <li>{comment.text}</li>
          )}
        </ul>
      }
    </div>
  )
}

export default Blog