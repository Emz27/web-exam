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
        url: "/../api/department/department_"+mode+".php",
        data: {
          id: this.state.id,
          description: this.state.description
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
      $.post({
        url: "/../api/department/department_delete.php",
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
        <td className={"text-center"}>{index+1}</td>
        <td className={"text-center"}>{`${department.description}`}</td>
        <td className={"text-center"}>
          <button type="button" className="btn btn-outline-dark" 
            onClick={(event)=>{
              this.handleUpdateButton({id:department.id,description:department.description});
            }}
            >
              Update
          </button>
          <button type="button" className="btn btn-outline-dark" 
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
            <button type="button" className="btn btn-outline-dark"  onClick={(event)=>{this.handleCancelButton(event);}}>
                Cancel
            </button>
            <button type="button" className="btn btn-outline-dark"  type="submit" onClick={(event)=>{this.handleSubmitButton(event);}}>
                Submit
            </button>
          </form>
        </div>
      )
    }
    else {
      return (
        <div>
        <button type="button" className="btn btn-outline-dark" 
          onClick={(event)=>{
            this.handleAddButton();
          }}
          >
            Add
        </button>
        <table className={"table"}>
          <tr>
            <th className={"text-center"}>#</th><th className={"text-center"}>Description</th><th className={"text-center"}>Action</th>
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
export {DepartmentPage}
