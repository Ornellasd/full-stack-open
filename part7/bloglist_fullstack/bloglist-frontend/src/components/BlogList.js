import BlogForm from '../components/BlogForm'
import Blog from '../components/Blog'

const BlogList = ({ user, blogs }) => {
  return (
    <div>
      <BlogForm />
            
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
        />
      )}
    </div>
  )
}

export default BlogList