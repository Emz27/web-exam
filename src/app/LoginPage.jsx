import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

class LoginPage extends React.Component{
  constructor(props) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      username: '',
      password: '',
      isCorrect: true,
    }
  }
  handleUsernameChange(event){
    this.setState({username : event.target.value})
  }
  handlePasswordChange(event){
    this.setState({password : event.target.value})
  }
  handleLogin(event){
    var user = this;

    $.ajax({
      url: "../api/login.php",
      method: "GET",
      data: {
        username: user.state.username,
        password: user.state.password
      }
    })
    .done(function(data){
      data = JSON.parse(data);
      console.log(data);
      console.log(data.isLogged)
      if(data.isLogged){
        user.props.loginUser(data);
      }
      else {
        user.setState({
          isCorrect: false
        })
      }
    })
    .fail(function(xhr) {
        console.dir(xhr);
        return alert("error in fetching session: "+ xhr);
    });
    event.preventDefault();
  }
  render(){
    return (
      <Router>
      <div>
      <form onSubmit={this.handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <input type="submit" value="Submit" />
      </form>
      </div>
      </Router>
    )
  }
}


export default LoginPage
