import { useState } from 'react'
import { Link } from 'react-router-dom'

import { 
  Divider,
  Fab, 
  List, 
  ListItem, 
  makeStyles, 
  Typography 
} from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'

import BlogForm from '../components/BlogForm'

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: '#000000'
  },
  article: {
    lineHeight: 1.35
  },
  addButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }
}))


const BlogList = ({ blogs }) => {
  const classes = useStyles()

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  return (
    <div>
      <BlogForm dialogOpen={dialogOpen} handleDialogClose={handleDialogClose} />
      <List>
        {blogs.map(blog =>
          <Link to={`/blogs/${blog.id}`} className={classes.link}>
            <ListItem button>
              <article className={classes.article}>
                <Typography variant="h6">
                  {blog.title}
                </Typography>
              </article>
            </ListItem>
            <Divider />
          </Link>
        )}
      </List>
      <Fab size="medium" color="primary" className={classes.addButton} onClick={handleDialogOpen}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default BlogList