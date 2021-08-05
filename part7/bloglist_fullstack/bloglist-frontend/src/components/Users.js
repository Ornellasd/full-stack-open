import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  makeStyles,
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

const useStyles = makeStyles(theme => ({
  tableContainer: {
    maxWidth: 750,
    margin: 'auto'
  },
  tableHeading: {
    backgroundColor: '#efefef',
    color: theme.palette.common.black
  },
  userRow: {
    textDecoration: 'none'
  }
}))

const Users = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])
  
  const users = useSelector(state => state.users)

  return (
    <div>
      <Typography align="center" component="h1" variant="h6">
        Users
      </Typography>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeading}>User</TableCell>
              <TableCell className={classes.tableHeading} align="right">Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user =>
              <TableRow className={classes.userRow} component={Link} to={`/users/${user.id}`} hover>
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