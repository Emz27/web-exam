import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

class UserPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      state_type: 'View',
      id:'',
      username:'',
      password:'',
      firstname: '',
      middlename: '',
      lastname: '',
      type: '',
      type_description: '',

      subject_id: [],
      subject_subject:[],
      subject_description: [],
      subject_teacher: [],

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
      $.get("../api/admin/user/user_fetch.php")
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
      $.get("../api/admin/subject/subject_fetch.php")
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
      $.get("../api/admin/teacher_subject/teacher_subject_fetch.php")
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
      $.get({
        url: "../api/admin/user/user_"+mode+".php",
        data: {
          id: this.state.id,
          username: this.state.username,
          password: this.state.password,
          firstname: this.state.firstname,
          middlename: this.state.middlename,
          lastname: this.state.lastname,
          type: this.state.type,
          subject_subject: this.state.subject_subject,
          subject_id: this.state.subject_id
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
      $.get({
        url: "../api/admin/user/user_delete.php",
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
      id:'',
      username:'',
      password:'',
      firstname: '',
      middlename: '',
      lastname: '',
      type: '2',
      type_description: '',

      subject_id : [],
      subject_subject: [],
      subject_description: [],
      subject_teacher:[]
    })
  }
  render(){
    var items = this.state.users.map((user,index)=>(
      <tr key={user.id}>
        <td>{index+1}</td>
        <td>{`${user.firstname} ${user.middlename} ${user.lastname}`}</td>
        <td>{user.type_description}</td>
        <td>{user.username}</td>
        <td>
          <button
            onClick={(event)=>{
              this.handleUpdateButton(user);
            }}
            >
              Update
          </button>
          <button
            onClick={(event)=>{
              this.handleDeleteButton(user.id);
            }}
            >
              Delete
          </button>
        </td>
      </tr>
    ));
    if(this.state.state_type == "Add" || this.state.state_type == "Update"){
      return (
        <div>
          <form>
            <div>
              <label>Username </label>
              <input type="text" placeholder="Username" value={this.state.username}
                onChange={(event)=>{this.handleInputChange({username: event.target.value})}}
              />
            </div>
            <div>
              <label>Password </label>
              <input type="password" placeholder="Password" value={this.state.password}
                onChange={(event)=>{this.handleInputChange({password: event.target.value})}}
              />
            </div>
            <div>
              <label>Firstname </label>
              <input type="text" placeholder="Firstname" value={this.state.firstname}
                onChange={(event)=>{this.handleInputChange({firstname: event.target.value})}}
              />
            </div>
            <div>
              <label>Middlename </label>
              <input type="text" placeholder="Middlename" value={this.state.middlename}
                onChange={(event)=>{this.handleInputChange({middlename: event.target.value})}}
              />
            </div>
            <div>
              <label>Lastname </label>
              <input type="text" placeholder="Lastname" value={this.state.lastname}
                onChange={(event)=>{this.handleInputChange({lastname: event.target.value})}}
              />
            </div>
            <div>
              <label>
                User Type :
                {
                  (()=>{
                    if(this.state.state_type=="Add"){
                      return (
                        <select value={this.state.type} onChange={(event)=>{this.handleInputChange({type: event.target.value})}}>
                          <option value="2">Teacher</option>
                          <option value="3">Student</option>
                        </select>
                      )
                    }
                    else return (<div>{this.state.type=="2"?"Teacher":"Student"}</div>)
                  })()
                }
              </label>
            </div>
            <div>
              <label>
                Subjects
                {
                  (()=>{
                    if(this.state.type == "2"){
                      var select = this.state.subject_subject.map((item,index)=>
                        <TeacherSubjectSelect key={item} obj={this} value={item} index={index} subject_subject={this.state.subject_subject.slice()} />
                      )
                      return (
                        <div>
                          {select}
                          <button onClick={(event)=>{
                            event.preventDefault();
                            if(this.state.subject_subject.length >= this.state.subject.length){

                            }
                            else this.handleInputChange({subject_subject:[...this.state.subject_subject,""]});

                          }}>
                              +
                          </button>
                        </div>
                      )
                    }
                    else{
                      var select = this.state.subject_subject.map((item,index)=>
                        <StudentSubjectSelect key={item} obj={this} value={item} index={index} subject_subject={this.state.subject_subject.slice()} />
                      )
                      return (
                        <div>
                          {select}
                          <button onClick={(event)=>{
                            event.preventDefault();
                            if(this.state.subject_subject.length >= this.state.available_subject.length){}
                            else this.handleInputChange({subject_subject:[...this.state.subject_subject,""]});
                          }}>
                            +
                          </button>
                        </div>
                      )
                    }
                  })()
                }
                {

                }
              </label>
            </div>
            <button onClick={(event)=>{this.handleCancelButton(event);}}>
                Cancel
            </button>
            <button type="submit" onClick={(event)=>{this.handleSubmitButton(event);}}>
                Submit
            </button>
          </form>
        </div>
      )
    }
    else {
      return (
        <div>
        <button
          onClick={(event)=>{
            this.handleAddButton();
          }}
          >
            Add
        </button>
        <table>
          <tr>
            <th>#</th><th>Name</th><th>Type</th><th>Username</th><th>Action</th>
          </tr>
          {
            items
          }
        </table>
        </div>
      )
    }
  }
}
const StudentSubjectSelect = (props)=>{
  return (
    <div>
    <select value={props.value} onChange={(event)=>{
        props.subject_subject[props.index] = event.target.value
        return props.obj.handleInputChange({subject_subject:props.subject_subject})
      }}>
      {
          props.obj.state.available_subject.map((s,index)=>
            (!props.subject_subject.includes(s.subject_id))?
            <option key={s.subject_id} value={s.subject_id}>{s.subject_description+" - "+s.subject_teacher}</option>
            :<option key={s.subject_id} value={s.subject_id} disabled>{s.subject_description+" - "+s.subject_teacher}</option>
          )
      }
      {(()=>{
        if(props.value==""){
          props.obj.state.available_subject.forEach((item,index,array)=>{
            if(!props.subject_subject.includes(item.subject_id)){
              props.subject_subject[props.index] = item.subject_id
              props.obj.handleInputChange({subject_subject:props.subject_subject})
            }
          });
        }
      }
      )()}
    </select>
    <button onClick={(event)=>{
      props.subject_subject.splice(props.index, 1);
      props.obj.handleInputChange({subject_subject:props.subject_subject});
      event.preventDefault();
    }}>
        x
    </button>
    </div>
  )
}
const TeacherSubjectSelect = (props)=>{
  return (
    <div>
    <select value={props.value} onChange={(event)=>{
        props.subject_subject[props.index] = event.target.value
        return props.obj.handleInputChange({subject_subject:props.subject_subject})
      }}>
      {
          props.obj.state.subject.map((s,index)=>
            (!props.subject_subject.includes(s.id))?
            <option key={s.id} value={s.id}>{s.description}</option>
            :<option key={s.id} value={s.id} disabled>{s.description}</option>
          )
      }
      {(()=>{
        if(props.value==""){
          props.obj.state.subject.forEach((item,index,array)=>{
            if(!props.subject_subject.includes(item.id)){
              props.subject_subject[props.index] = item.id
              props.obj.handleInputChange({subject_subject:props.subject_subject})
            }
          });
        }
      }
      )()}
    </select>
    <button onClick={(event)=>{
      props.subject_subject.splice(props.index, 1);
      props.obj.handleInputChange({subject_subject:props.subject_subject});
      event.preventDefault();
    }}>
        x
    </button>
    </div>
  )
}



export default UserPage
