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
  
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} <button className="like-button" onClick={() => dispatch(upvote(blog))}>like</button></p>
      <p>added by {blog.user.name}</p>
      {blog.comments.length > 0 &&
        <div>
          <h3>comments</h3>
          <ul>
            {blog.comments.map(comment =>
              <li>{comment.text}</li>
            )}
          </ul>
        </div>
      }
    </div>
  )
}

export default Blog