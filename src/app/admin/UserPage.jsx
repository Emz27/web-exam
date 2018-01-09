import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import {UserTable} from './user/UserTable.jsx'
import {UserAddEdit} from './user/UserAddEdit.jsx'
import {emptyUser} from './emptyState.jsx'
class UserPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      state_type: 'View',
      ...emptyUser,
      users: [],
      subject: [],
      available_subject: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDeleteButton = this.handleDeleteButton.bind(this)
    this.handleUpdateButton = this.handleUpdateButton.bind(this)
    this.handleAddButton = this.handleAddButton.bind(this)
    this.handleCancelButton = this.handleCancelButton.bind(this)
    this.handleSubmitButton = this.handleSubmitButton.bind(this)
    this.fetchUser = this.fetchUser.bind(this)
    this.fetchSubject = this.fetchSubject.bind(this)
    this.fetchAvailableSubject = this.fetchAvailableSubject.bind(this)
  }
  componentDidMount() {
      this.fetchUser();
      this.fetchSubject();
      this.fetchAvailableSubject();
  }
  // componentWillUnmount() {
  //
  // }
  fetchUser(){
      $.post("/../api/user/user_fetch.php")
      .done((data)=>{
        var data = JSON.parse(data);
        var temp = data.slice();

        for(var i=0; i < temp.length; i++){
          temp[i].subject_subject = temp[i].subject_subject[0]?temp[i].subject_subject[0].split(","):[]
          temp[i].subject_id = temp[i].subject_id[0]?temp[i].subject_id[0].split(","):[]
          temp[i].subject_description = temp[i].subject_description[0]?temp[i].subject_description[0].split(","):[]
          temp[i].subject_teacher = temp[i].subject_teacher[0]?temp[i].subject_teacher[0].split(","):[]
        }
        var result={};
        result.users = temp;
        this.setState({...result});
      })
      .fail(function(xhr) {
          return alert("error in fetching session: "+ xhr);
      });
  }
  fetchSubject(){
      $.post("/../api/subject/subject_fetch.php")
      .done((data)=>{
        var data = JSON.parse(data);

        var result={};
        result.subject = data;
        this.setState({...result});
      })
      .fail(function(xhr) {
          return alert("error in fetching session: "+ xhr);
      });
  }
  fetchAvailableSubject(){
      $.post("/../api/teacher_subject/teacher_subject_fetch.php")
      .done((data)=>{

        var temp = JSON.parse(data);
        var result={};
        result.available_subject = temp;

        this.setState({...result});
      })
      .fail(function(xhr) {
          return alert("error in fetching session: "+ xhr);
      });
  }
  handleSubmitButton(event){
    event.preventDefault();
      var mode = this.state.state_type=="Add"?"add":"update"
      console.dir(this.state);
      $.post({
        url: "/../api/user/user_"+mode+".php",
        data: {
          ...this.state
        }
      })
      .done((data)=>{
        console.dir(data);
        this.setState({
          state_type: "View"
        });
        this.fetchUser();
        this.fetchSubject();
        this.fetchAvailableSubject();
      })
      .fail(function(xhr) {
          return alert("error in fetching session: "+ xhr);
      });
  }
  handleCancelButton(event){
    event.preventDefault();
    this.setState({
      state_type: "View"
    })
  }
  handleInputChange(input){
    this.setState({...input});
  }
  handleDeleteButton(user){
    if (confirm("Are You Sure you Want to delete the user?") == true) {
      $.post({
        url: "/../api/user/user_delete.php",
        data: {
          id: user
        }
      })
      .done((data)=>{
        this.fetchUser();
        this.fetchSubject();
        this.fetchAvailableSubject();
      })
      .fail(function(xhr) {
          return alert("error: "+ xhr);
      });
    } else {

    }
  }
  handleUpdateButton(user){
    user.state_type= "Update"
    this.setState({
      ...user
    })
  }
  handleAddButton(user){
    this.setState({
      state_type: 'Add',
      ...emptyUser,

      subject_id : [],
      subject_subject: [],
      subject_description: [],
      subject_teacher:[]
    })
  }
  render(){
    if(this.state.state_type == "Add" || this.state.state_type == "Update"){
      return (
        <UserAddEdit parent={this} />
      )
    }
    else {
      return (
        <div>
          <h1>User</h1>
        <button type="button" className="btn btn-outline-dark"
          onClick={(event)=>{
            this.handleAddButton();
          }}
          >
            Add
        </button>
        <UserTable parent={this} />
        </div>
      )
    }
  }
}

export {UserPage}
