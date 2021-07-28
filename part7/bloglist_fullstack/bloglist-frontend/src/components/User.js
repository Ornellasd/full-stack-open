import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'

import { getUsers } from '../reducers/usersReducer'

const User = () => {
  const dispatch = useDispatch()
  const id = useParams().id

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])
  
  const users = useSelector(state => state.users)
  const user = users.find(u => u.id === id) 

  if(!user) {
    return null
  }

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