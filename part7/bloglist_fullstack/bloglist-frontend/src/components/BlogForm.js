import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Divider, Fab, List, ListItem, makeStyles, TextField } from '@material-ui/core'

const BlogForm = ({ dialogOpen, handleDialogClose }) => {
  const dispatch = useDispatch()

  const handleSubmit = event => {
    event.preventDefault()
    const content = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    
    dispatch(createBlog(content))

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    handleDialogClose()
  }

  return (
    <Dialog open={dialogOpen} onClose={handleDialogClose}>
      <DialogTitle>Create New</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            fullWidth
          />
          <TextField
            margin="dense"
            name="author"
            label="Author"
            fullWidth
          />
          <TextField
            margin="dense"
            name="url"
            label="URL"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default BlogForm