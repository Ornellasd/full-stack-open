import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Link, useHistory } from 'react-router-dom'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  List, 
  ListItem,
  TextField,
  Typography
} from '@material-ui/core'

import ThumbUpIcon from '@material-ui/icons/ThumbUp'

import { upvote, addComment, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ loggedInUser, blogs }) => {
  const id = useParams().id
  const dispatch = useDispatch()
  const history = useHistory()

  const blog = blogs.find(b => b.id === id)
  
  const handleUpvote = () => {
    const upvotedBlog = {...blog, likes: blog.likes += 1, user: blog.user.id}
    dispatch(upvote(upvotedBlog))
  }

  const handleComment = (event) => {
    event.preventDefault()
    const comment = {
      text: event.target.comment.value,
    }

    const commentedBlog = {...blog, comments: blog.comments.concat(comment)}
    
    dispatch(addComment(commentedBlog))
    event.target.comment.value = ''
  }

  const handleDelete = () => {
    if(window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      history.push('/')
    } 
  }

  // return (
  //   <div>
  //     <h2>{blog.title}</h2>
  //     <a href={blog.url}>{blog.url}</a>
  //     <p>{blog.likes} <button className="like-button" onClick={() => handleUpvote()}>like</button></p>
  //     <p>added by {blog.user.name}</p>
  //     {(loggedInUser && loggedInUser.username === blog.user.username) &&
  //       <button className="remove-button" onClick={handleDelete}>remove</button>
  //     }
  //     <h3>comments</h3>
  //     <span>
  //       <form onSubmit={handleComment}>
  //         <input type="text" name="comment" />
  //         <button>add comment</button>
  //       </form>
  //     </span>
      
  //     {blog.comments.length > 0 &&
  //       <ul>
  //         {blog.comments.map(comment =>
  //           <li>{comment.text}</li>
  //         )}
  //       </ul>
  //     }
  //   </div>
  // )

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">
          {blog.title}
        </Typography>
        <Typography color="textSecondary" style={{ marginBottom: 12 }}>
          added by {blog.user.name}
        </Typography>
        <Typography component={Link} to={blog.url}>
          {blog.url}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => handleUpvote()}>
          <ThumbUpIcon />
        </IconButton>
        <Typography>{blog.likes} likes</Typography>
      </CardActions>
    </Card>
  )
}

export default Blog