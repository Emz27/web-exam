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
      <li className={match ? 'active' : ''}>
        {match ? '> ' : ''}<Link to={to}>{label}</Link>
      </li>
    )
  }/>
)
const NavBar = () => (
  <ul>
    <MenuLink to="/teacher" label="Home"/>
    <MenuLink to="/teacher/questions" label="Questions"/>
    <MenuLink to="/teacher/exams" label="Exams"/>
    <MenuLink to="/logout" label="Logout"/>
  </ul>
)

class TeacherPage extends React.Component{
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
