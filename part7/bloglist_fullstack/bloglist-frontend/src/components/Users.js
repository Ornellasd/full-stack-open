import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getUsers } from '../reducers/usersReducer'

const Users = ({ loggedInUser }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [])
  
  const users = useSelector(state => state.users)
  console.log(users)

  if(loggedInUser !== null) {
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
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </table>
      </div>
    )
  } else {
    return null
  }
}

export default Users