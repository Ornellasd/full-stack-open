import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'

const BlogList = ({ alerts, user }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <h2>blogs</h2>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default BlogList