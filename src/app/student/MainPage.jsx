import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

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
  </ul>
)

class MainPage extends React.Component{
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
        <Route path="/" component={HomePage} />
        <Route path="/users" component={UserPage} />
        <Route path="/questions" component={QuestionPage} />
        <Route path="/exams" component={ExamPage} />
        <Route path="/subjects" component={SubjectPage} />
        <Route path="/departments" component={DepartmentPage} />
      </div>
      </Router>
    )
  }
}


export default MainPage
