import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core'

import { getUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])
  
  const users = useSelector(state => state.users)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Blogs Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user =>
            <TableRow component={Link} to={`/users/${user.id}`} hover>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Users