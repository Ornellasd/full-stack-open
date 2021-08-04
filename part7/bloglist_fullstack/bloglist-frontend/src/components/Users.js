import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core'

import { getUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])
  
  const users = useSelector(state => state.users)

  return (
    <div>
      <Typography align="center" component="h1" variant="h6">
        Users
      </Typography>
      <TableContainer component={Paper} style={{ maxWidth: 750, margin: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="right">Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user =>
              <TableRow component={Link} to={`/users/${user.id}`} style={{ textDecoration: 'none'}} hover>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.blogs.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users