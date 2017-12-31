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
import {default as AdminPage} from './admin/MainPage.jsx'
import {default as TeacherPage} from './teacher/MainPage.jsx'
import {default as StudentPage} from './student/MainPage.jsx'

const user = {
  isLogged: false,
  id: -1,
  firstname: null,
  middlename: null,
  lastname: null,
  type: -1,
  date_created: null
}
// get user session
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
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }
  loginUser(user){
    console.log("yeye");
    this.setState({...user});
  }
  logoutUser(){
    var user = this;
    $.ajax({
      url: "../api/logout.php",
      method: "GET",
    })
    .done(function(data){
      user.setState({
        isLogged: false,
        id: -1,
        firstname: null,
        middlename: null,
        lastname: null,
        type: -1,
        date_created: null
      });
    })
    .fail(function(xhr) {
        return alert("error in fetching session: "+ xhr);
    });
  }
  render(){
    switch(this.state.type){
      case "1": return (<div><AdminPage logoutUser={this.logoutUser} /></div>)
      case "2": return (<div><Teacherpage logoutUser={this.logoutUser} /></div>)
      case "3": return (<div><StudentPage logoutUser={this.logoutUser} /></div>)
      default:{
        // user not logged
        return (
          <div>
            <Router>
              <div>
                <Redirect to={'/login'}/>
                <LoginPage loginUser={this.loginUser} user={this.state} />
              </div>
            </Router>
          </div>
        )
      }
    }
  }
}
