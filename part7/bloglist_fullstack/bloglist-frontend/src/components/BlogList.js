import { useDispatch } from 'react-redux'

import { logout } from '../reducers/userReducer'

import Alerts from '../components/Alerts'
import BlogForm from '../components/BlogForm'
import Blog from '../components/Blog'

const BlogList = ({ alerts, user, blogs }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <h2>blogs</h2>
      <Alerts alerts={alerts} />
      {user.name} logged in <button onClick={handleLogout}>logout</button>
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