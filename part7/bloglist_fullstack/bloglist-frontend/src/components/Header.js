import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../reducers/loginReducer'

import Alerts from '../components/Alerts'

const Header = ({ user }) => {
  const dispatch = useDispatch()
  const alerts = useSelector(state => state.alerts)

  if(user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={() => dispatch(logout())}>logout</button>
        <Alerts alerts={alerts} />
      </div>
    )
  } else {
    return null
  }
}

export default Header