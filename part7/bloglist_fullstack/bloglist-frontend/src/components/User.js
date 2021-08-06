import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import {
  Divider,
  List,
  ListItem,
  makeStyles,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
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
        {user.blogs.map((blog) =>
          <Link className={classes.post} to={`/blogs/${blog.id}`} key={blog.id}>
            <ListItem button>
              <Typography variant="h6">
                {blog.title}
              </Typography>
            </ListItem>
            <Divider />
          </Link>
        )}
      </List>
    </div>
  )
}

export default User