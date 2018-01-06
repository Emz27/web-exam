import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

class SubjectPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      state_type: 'View',
      id:'',
      description:'',
      department:'',

      subjects: [],
      departments: [],
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDeleteButton = this.handleDeleteButton.bind(this)
    this.handleUpdateButton = this.handleUpdateButton.bind(this)
    this.handleAddButton = this.handleAddButton.bind(this)
    this.handleCancelButton = this.handleCancelButton.bind(this)
    this.handleSubmitButton = this.handleSubmitButton.bind(this)
    this.fetchSubject = this.fetchSubject.bind(this)
    this.fetchDepartment = this.fetchDepartment.bind(this)
  }
  componentDidMount() {
      this.fetchSubject();
      this.fetchDepartment();
  }
  fetchSubject(){
      $.post("/../api/subject/subject_fetch.php")
      .done((data)=>{
        var data = JSON.parse(data);

        var result={};
        result.subjects = data;
        this.setState({...result});
      })
      .fail(function(xhr) {
          return alert("error in fetching session: "+ xhr);
      });
  }
  fetchDepartment(){
      $.post("/../api/department/department_fetch.php")
      .done((data)=>{
        var data = JSON.parse(data);

        var result={};
        result.departments = data;
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
        url: "/../api/subject/subject_"+mode+".php",
        data: {
          id: this.state.id,
          description: this.state.description,
          department: this.state.department
        }
      })
      .done((data)=>{
        console.dir(data);
        this.setState({
          state_type: "View"
        });
        this.fetchSubject();
        this.fetchDepartment();
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
  handleDeleteButton(id){
    if (confirm("Are You Sure you Want to delete the user?") == true) {
      $.post({
        url: "/../api/subject/subject_delete.php",
        data: {
          id: id
        }
      })
      .done((data)=>{
        this.fetchSubject();
        this.fetchDepartment();
      })
      .fail(function(xhr) {
          return alert("error: "+ xhr);
      });
    } else {

    }
  }
  handleUpdateButton(props){
    this.setState({
      state_type: 'Update',
      id: props.id,
      description: props.description,
      department: props.department
    })
  }
  handleAddButton(user){
    this.setState({
      state_type: 'Add',
      id:'',
      description:'',
      department:''
    })
  }
  render(){
    var items = this.state.subjects.map((subject,index)=>(
      <tr key={subject.id}>
        <td>{index+1}</td>
        <td>{`${subject.description}`}</td>
        <td>{`${subject.department_description}`}</td>
        <td>
          <button
            onClick={(event)=>{
              this.handleUpdateButton({
                id:subject.id,
                description:subject.description,
                department:subject.department
              });
            }}
            >
              Update
          </button>
          <button
            onClick={(event)=>{
              this.handleDeleteButton(subject.id);
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
              <label>Description
              <input type="text" placeholder="Description" value={this.state.description}
                onChange={(event)=>{this.handleInputChange({description: event.target.value})}}
              />
              </label>
            </div>
            <div>
              <label>
                Department
              <select value={this.state.department} onChange={(event)=>{this.handleInputChange({department: event.target.value})}}>
                {
                  this.state.departments.map((department,index)=>
                    <option key={index} value={department.id}>{department.description}</option>
                  )
                }
              </select>
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
            <th>#</th><th>Description</th><th>Department</th><th>Action</th>
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
export {SubjectPage}
