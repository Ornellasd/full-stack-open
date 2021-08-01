import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../reducers/loginReducer'

const Navbar = ({ user }) => {
  const dispatch = useDispatch()

  const padding = {
    padding: 3
  }

  const divStyle = {
    padding: 5,
    backgroundColor: '#d2d2d2'
  }

  return (
    <div style={divStyle}>
      <Link to="/blogs" style={padding}>blogs</Link>
      <Link to="/users" style={padding}>users</Link>
      <span style={padding}>{user.name} logged in</span>
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  )
}

export default Navbar