import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import 'whatwg-fetch'

import LoginPage from './LoginPage.jsx'
import AdminPage from './AdminPage.jsx'
import TeacherPage from './TeacherPage.jsx'
import StudentPage from './StudentPage.jsx'

const user = {
  isLogged: false,
  id: -1,
  firstname: null,
  middlename: null,
  lastname: null,
  type: -1,
  date_created: null
}
$.ajax({
  url: "../api/session.php",
  method: "GET",
})
.done(function(data){
  console.log(data);
  data = JSON.parse(data);
  if(data.isLogged){
    user.isLogged = true;
    user.id = data.id;
    user.firstname = data.firstname;
    user.middlename = data.middlename;
    user.lastname = data.lastname;
    user.type = data.type;
    user.date_created = data.date_created;
  }
  ReactDOM.render(
      <MainPage user={user}/>,
      document.getElementById("root")
  );
})
.fail(function(xhr) {
    console.dir(xhr);
    return alert("error in fetching session: "+ xhr);
});


class MainPage extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.user;
    this.changeUser = this.changeUser.bind(this);
  }
  changeUser(user){
    console.log("hey")
    this.setState({...user});
  }
  render(){
    switch(user.type){
      case "1":{
        return (
          <div>
            <AdminPage />
          </div>
        )
      }
      case "2":{
        return (
          <div>
            <Teacherpage />
          </div>
        )
      }
      case "3":{
        return (
          <div>
            <StudentPage />
          </div>
        )
      }
      default:{
        // user not logged
        return (

          <div>
            <Router>
              <div>
                <Redirect to={'/login'}/>
                <LoginPage changeUser={this.changeUser} user={this.props.user} />
              </div>
            </Router>
          </div>
        )
      }
    }
  }
}
