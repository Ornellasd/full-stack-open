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
  TextField,
  Typography
} from '@material-ui/core'

import {
  Chat,
  ThumbUp,
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

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    const comment = {
      text: event.target.comment.value,
    }

    const commentedBlog = {...blog, comments: blog.comments.concat(comment)}

    dispatch(addComment(commentedBlog))
    event.target.comment.value = ''
    handleCommentDialogClose()
  }

  const dialog = () => (
    <Dialog
      open={commentDialogOpen}
      fullWidth
    >
      <form onSubmit={handleCommentSubmit}>     
        <DialogTitle>Create New Comment</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="comment"
            label="Text"
            fullWidth
            autoFocus
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCommentDialogClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  )

  return (
    <div>
      <Card variant="outlined" style={{ marginBottom: 20 }}>
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
      {blog.comments.length > 0 &&
        <div>
        <Typography align="center" variant="h6">Comments</Typography>
        {blog.comments.map(comment =>
          <Box boxShadow="1" m={3} p={1} bgcolor="#efefef">
            {comment.text}
          </Box>
        )}
        </div>
      }
      {dialog()}
    </div>
  )
}

export default Blog