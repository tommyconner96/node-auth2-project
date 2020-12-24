import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch, useHistory } from 'react-router-dom'
import Login from './Login'
import UserList from './UserList'
import PrivateRoute from '../util/PrivateRoute'

function App(props) {

  const history = useHistory()
  const logOut = () => {
    localStorage.removeItem('token')
    history.push('/')
  }
  return (
    <div>
<Router>
      <div className='app-container'>
        <Link to='/'>Home</Link>
        <Link to='/signup'>Sign Up</Link>
        <Link to='/user-list'>User List</Link>
        <button onClick={logOut}>Log Out</button>
        <Switch>
          <PrivateRoute exact path='/user-list' component={UserList} />
          <Route path='/' component={Login} />
        </Switch>
        hi

      </div>
    </Router>
    </div>
    
  )
}

export default App

