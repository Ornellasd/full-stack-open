import { Link } from 'react-router-dom'

import BlogForm from '../components/BlogForm'

const BlogList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <BlogForm />
            
      {blogs.map(blog =>
        <div style={blogStyle} className="unexpanded">
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )}
    </div>
  )
}

export default BlogList