import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

const UserTable = (props)=>{
  var items = props.parent.state.users.map((user,index)=>(
    <tr key={user.id}>
      <td className={"text-center"}>{index+1}</td>
      <td className={"text-center"}>{`${user.firstname} ${user.middlename} ${user.lastname}`}</td>
      <td className={"text-center"}>{user.type_description}</td>
      <td className={"text-center"}>{user.username}</td>
      <td className={"text-center"}>
        <button type="button" className="btn btn-outline-dark" 
          onClick={(event)=>{
            props.parent.handleUpdateButton(user);
          }}
          >
            Update
        </button>
        <button type="button" className="btn btn-outline-dark" 
          onClick={(event)=>{
            props.parent.handleDeleteButton(user.id);
          }}
          >
            Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <div>
    <table className={"table"}>
      <tr>
        <th className={"text-center"}>#</th><th className={"text-center"}>Name</th><th className={"text-center"}>Type</th><th className={"text-center"}>Username</th><th className={"text-center"}>Action</th>
      </tr>
      {
        items
      }
    </table>
    </div>
  )
}

export {UserTable}
