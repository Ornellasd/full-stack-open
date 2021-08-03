import { Link } from 'react-router-dom'

import { Divider, List, ListItem, makeStyles } from '@material-ui/core'

import BlogForm from '../components/BlogForm'

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: '#000000'
  },
  article: {
    lineHeight: 1.35
  }
}))

const BlogList = ({ blogs }) => {
  const classes = useStyles()

  return (
    <div>
      {blogs.map(blog =>
        <List>
          <Link to={`/blogs/${blog.id}`} className={classes.link}>
            <ListItem button>
              <article className={classes.article}>
                <h2>
                  <strong>{blog.title}</strong>
                </h2>
              </article>
            </ListItem>
          </Link>
          <Divider />
        </List>
      )}
    </div>
  )
}

export default BlogList