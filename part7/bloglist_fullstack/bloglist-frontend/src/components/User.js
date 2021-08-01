import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const User = () => {
  const id = useParams().id

  const users = useSelector(state => state.users)
  const user = users.find(u => u.id === id) 

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User