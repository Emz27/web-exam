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
import {DepartmentPage} from './DepartmentPage.jsx'
import {ExamPage} from './ExamPage.jsx'
import {QuestionPage} from './QuestionPage.jsx'
import {SubjectPage} from './SubjectPage.jsx'
import {UserPage} from './UserPage.jsx'

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
    <MenuLink to="/admin" label="Home"/>
    <MenuLink to="/admin/users" label="Users"/>
    <MenuLink to="/admin/questions" label="Questions"/>
    <MenuLink to="/admin/exams" label="Exams"/>
    <MenuLink to="/admin/subjects" label="Subjects"/>
    <MenuLink to="/admin/departments" label="Departments"/>
    <MenuLink to="/logout" label="Logout"/>
  </ul>
)

class AdminPage extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <Router>
      <div>
        <NavBar />
        <div>
          <Switch>
            <Route path="/admin" exact component={HomePage} />
            <Route path="/admin/users" component={UserPage} />
            <Route path="/admin/questions" component={QuestionPage} />
            <Route path="/admin/exams" component={ExamPage} />
            <Route path="/admin/subjects" component={SubjectPage} />
            <Route path="/admin/departments" component={DepartmentPage} />
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

export {AdminPage}
