import { Divider, List, ListItem, makeStyles, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  post: {
    textDecoration: 'none',
    color: 'black'
  }
}))

const User = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  const user = users.find(u => u.id === id) 
  const classes = useStyles()

  return (
    <div>
      <Typography align="center" component="h1" variant="h5">
        blogs added by {user.name}
      </Typography>
      <List>
        {user.blogs.map(blog =>
          <Link className={classes.post} to={`/blogs/${blog.id}`}>
            <ListItem button>
              {blog.title}
            </ListItem>
            <Divider />
          </Link>
        )}
      </List>
    </div>
  )
}

export default User