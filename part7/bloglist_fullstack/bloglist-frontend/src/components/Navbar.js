import React from 'react'

import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { logout } from '../reducers/loginReducer'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 20
  },
  title: {
    marginRight: theme.spacing(5),
  },
  navbar : {
    backgroundColor : '#689f38'
  },
  navLinks: {
    flexGrow: 1
  }
}))

const Navbar = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar className={classes.navbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Blog App
          </Typography>
          <div className={classes.navLinks}>
            <Button color="inherit" component={Link} to="/blogs">Blogs</Button>
            <Button color="inherit" component={Link} to="/users">Users</Button>
          </div>
          <Button color="inherit" onClick={() => dispatch(logout())}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  )
}

export default Navbar