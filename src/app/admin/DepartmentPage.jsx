import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

class DepartmentPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      state_type: 'View',
      id:'',
      description:'',

      departments: [],
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDeleteButton = this.handleDeleteButton.bind(this)
    this.handleUpdateButton = this.handleUpdateButton.bind(this)
    this.handleAddButton = this.handleAddButton.bind(this)
    this.handleCancelButton = this.handleCancelButton.bind(this)
    this.handleSubmitButton = this.handleSubmitButton.bind(this)
    this.fetchDepartment = this.fetchDepartment.bind(this)
  }
  componentDidMount() {
      this.fetchDepartment();
  }
  fetchDepartment(){
      $.get("../api/admin/department/department_fetch.php")
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
      $.get({
        url: "../api/admin/department/department_"+mode+".php",
        data: {
          id: this.state.id,
          description: this.state.id
        }
      })
      .done((data)=>{
        console.dir(data);
        this.setState({
          state_type: "View"
        });
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
      $.get({
        url: "../api/admin/department/department_delete.php",
        data: {
          id: id
        }
      })
      .done((data)=>{
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
    })
  }
  handleAddButton(user){
    this.setState({
      state_type: 'Add',
      id:'',
      description:'',
    })
  }
  render(){
    var items = this.state.departments.map((department,index)=>(
      <tr key={department.id}>
        <td>{index+1}</td>
        <td>{`${department.description}`}</td>
        <td>
          <button
            onClick={(event)=>{
              this.handleUpdateButton({id:department.id,description:department.description});
            }}
            >
              Update
          </button>
          <button
            onClick={(event)=>{
              this.handleDeleteButton(department.id);
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
              <label>Description </label>
              <input type="text" placeholder="Description" value={this.state.description}
                onChange={(event)=>{this.handleInputChange({description: event.target.value})}}
              />
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
            <th>#</th><th>Description</th><th>Action</th>
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
export default DepartmentPage
