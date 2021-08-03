import { Link } from 'react-router-dom'

import { Divider, List, ListItem } from '@material-ui/core'

import BlogForm from '../components/BlogForm'

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map(blog =>
        <List>
          <Link to={`/blogs/${blog.id}`}>
            <ListItem>
              <article>
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