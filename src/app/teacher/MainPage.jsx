import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import {HomePage} from './HomePage.jsx'
import {ExamPage} from './ExamPage.jsx'
import {QuestionPage} from './QuestionPage.jsx'


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
    <MenuLink to="/teacher" label="Home"/>
    <MenuLink to="/teacher/questions" label="Questions"/>
    <MenuLink to="/teacher/exams" label="Exams"/>
  </ul>
  <ul className="nav navbar-nav navbar-right">
    <li><span class="navbar-text">
      Logged in as: {props.user.firstname}
    </span></li>
    <li><a href="#"><span class="glyphicon glyphicon-log-in"></span><MenuLink to="/logout" label="Logout"/></a></li>
  </ul>
</nav>
)

class TeacherPage extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <Router>
      <div>
        <NavBar user={this.props.user} />
        <div>
          <Switch>
            <Route path="/teacher" exact component={HomePage} />
            <Route path="/teacher/questions" component={QuestionPage} />
            <Route path="/teacher/exams" component={ExamPage} />
            <Route path="/logout" render={function(){
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

export {TeacherPage}
