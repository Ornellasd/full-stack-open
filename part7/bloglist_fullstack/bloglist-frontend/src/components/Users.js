import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { getUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])
  
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users.map(user =>
          <tr>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default Users