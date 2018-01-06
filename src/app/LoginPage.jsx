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
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      username: '',
      password: '',
      isCorrect: true,
    }
  }
  handleTextChange(input){
    this.setState({...input});
  }
  handleLogin(event){
    var user = this;

    $.ajax({
      url: "/../api/login.php",
      method: "POST",
      data: {
        username: user.state.username,
        password: user.state.password
      }
    })
    .done(function(data){
      console.dir(data);
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
          onChange={(event)=>{
            var input ={};
            input.username = event.target.value
            this.handleTextChange(input)
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={(event)=>{
            var input ={};
            input.password = event.target.value
            this.handleTextChange(input)
          }}
        />
        <input type="submit" value="Submit" />
      </form>
      <br />
      <br />
      <br />
      Progress: 70% as of 4:30 AM January 7, 2018<br/>
      Features:<br/>
        #Account System<br/>
        - username and password credentials are required to use the service<br/>
        #Admin System<br/>
        - create/update/delete/view user,subject,department,question,exam data<br/>

      Work in progress feature:<br/>
        - student examination sheet<br/>

      Recent Dev Activity
      - User homepage that contains exam tables (January 7)
      - Admin Crud (January 4)
      </div>

      </Router>
    )
  }
}


export {LoginPage}
