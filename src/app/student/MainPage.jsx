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
import {ExamPage} from './ExamPage.jsx'

const MenuLink = ({ label, to }) => (
  <Route path={to} exact={true} children={
    ({ match }) => (
      <li className={"nav-item "+ (match ? 'active' : '')}>
        <Link to={to}><a href="#" className="nav-link">{label}</a></Link>
      </li>
    )
  }/>
)

const NavBar = (props) => (
<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
  <a className="navbar-brand" href="#">Informatics Exam System</a>
  <ul className="navbar-nav mr-auto">
    <MenuLink to="/student/profile" label="Home"/>
  </ul>
  <ul className="nav navbar-nav navbar-right">
    <li><span class="navbar-text">
      Logged in as: {props.user.firstname}
    </span></li>
    <li><a href="#"><span class="glyphicon glyphicon-log-in"></span><MenuLink to="/logout" label="Logout"/></a></li>
  </ul>
</nav>
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
      <Router >
        <div className="col d-flex flex-column align-items-stretch p-0 m-0 h-100">
        <NavBar user={this.props.user} />
        <Switch>
          <Route path="/student/profile"  render={
            ()=>{
              console.dir(this.props.user)
              return (
                <ProfilePage user={this.props.user} />
              )

            }
          } />
          <Route path="/student/exam/:exam_id" component={ExamPage} />
          <Route path="/logout" render={function(){
            console.log("logout");
            this.props.logoutUser()
            return (<Redirect to={'/login'}/>)
          }.bind(this)} />

        </Switch>
        </div>
      </Router>
    )
  }
}


export {StudentPage}
