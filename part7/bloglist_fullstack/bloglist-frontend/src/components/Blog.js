import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Link, useHistory } from 'react-router-dom'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List, 
  ListItem,
  TextField,
  Typography
} from '@material-ui/core'

import {
  Chat,
  ThumbUp,
  Delete
} from '@material-ui/icons'

import { upvote, addComment, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ loggedInUser, blogs }) => {
  const [commentDialogOpen, setCommentDialogOpen] = useState(false)

  const id = useParams().id
  const dispatch = useDispatch()
  const history = useHistory()

  const blog = blogs.find(b => b.id === id)
  
  const handleUpvote = () => {
    const upvotedBlog = {...blog, likes: blog.likes += 1, user: blog.user.id}
    dispatch(upvote(upvotedBlog))
  }

  const handleDelete = () => {
    if(window.confirm(`Delete '${blog.title}' by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      history.push('/')
    } 
  }

  const handleCommentDialogOpen = () => {
    setCommentDialogOpen(true)
  }

  const handleCommentDialogClose = () => {
    setCommentDialogOpen(false)
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

  const dialog = () => (
    <Dialog
      open={commentDialogOpen}
      fullWidth
    >
      <DialogTitle>Create New Comment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="text"
          label="Text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCommentDialogClose}>
          Cancel
        </Button>
        <Button>Create</Button>
      </DialogActions>
    </Dialog>
  )

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
    <div>
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
            <ThumbUp />
          </IconButton>
          <Typography>{blog.likes} likes</Typography>
          <IconButton onClick={handleCommentDialogOpen}>
            <Chat />
          </IconButton>
          {(loggedInUser && loggedInUser.username === blog.user.username) &&
            <Button
              size="small" 
              color="secondary" 
              variant="contained" 
              style={{ marginLeft: 'auto' }}
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          }
        </CardActions>
      </Card>
      {dialog()}
    </div>
  )
}

export default Blog