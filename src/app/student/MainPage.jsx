import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

import {ProfilePage} from './ProfilePage.jsx'

const MenuLink = ({ label, to }) => (
  <Route path={to} exact={true} children={
    ({ match }) => (
      <li className={match ? 'active' : ''}>
        {match ? '> ' : ''}<Link to={to}>{label}</Link>
      </li>
    )
  }/>
)

const NavBar = () => (
  <ul>
    <MenuLink to="/student/profile" label="Home"/>
    <MenuLink to="/logout" label="Logout"/>
  </ul>
)

class StudentPage extends React.Component{
  constructor(props) {
    super(props);
  }
  handleUsernameChange(event){
    this.setState({username : event.target.value})
  }
  handlePasswordChange(event){
    this.setState({password : event.target.value})
  }
  render(){
    return (
      <Router>
      <div>
        <NavBar />
        <div>
        <Switch>
          <Route path="/student/profile"  render={
            ()=>{
              console.dir(this.props.user)
              return (
                <ProfilePage user={this.props.user} />
              )

            }
          } />
          <Route path="/logout" render={function(){
            console.log("logout");
            this.props.logoutUser()
            return (<Redirect to={'/login'}/>)
          }.bind(this)} />

        </Switch>
        </div>
      </div>
      </Router>
    )
  }
}


export {StudentPage}
