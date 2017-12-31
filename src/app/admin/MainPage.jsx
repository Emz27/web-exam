import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import HomePage from './HomePage.jsx'
import DepartmentPage from './DepartmentPage.jsx'
import ExamPage from './ExamPage.jsx'
import QuestionPage from './QuestionPage.jsx'
import SubjectPage from './SubjectPage.jsx'
import UserPage from './UserPage.jsx'

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
    <MenuLink to="/" label="Home"/>
    <MenuLink to="/users" label="Users"/>
    <MenuLink to="/questions" label="Questions"/>
    <MenuLink to="/exams" label="Exams"/>
    <MenuLink to="/subjects" label="Subjects"/>
    <MenuLink to="/departments" label="Departments"/>
    <MenuLink to="/logout" label="Logout"/>
  </ul>
)

class MainPage extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <Router>
      <div>
        <NavBar />
        <div>
        <Route path="/" exact component={HomePage} />
        <Route path="/users" exact component={UserPage} />
        <Route path="/questions" exact component={QuestionPage} />
        <Route path="/exams" exact component={ExamPage} />
        <Route path="/subjects" exact component={SubjectPage} />
        <Route path="/departments" exact component={DepartmentPage} />
        <Route path="/logout" render={function(){
          this.props.logoutUser()
          return (<Redirect to={'/'}/>)
        }.bind(this)} />
        </div>
      </div>
      </Router>
    )
  }
}

export default MainPage
